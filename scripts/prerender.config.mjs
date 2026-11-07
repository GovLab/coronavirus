// Site settings for scripts/prerender.mjs: which pages to pre-render, which Vue
// data each one is seeded with, its head tags and JSON-LD, and its Markdown copy.
// English only: the es/ and pt/ copies of the site are left as they are.
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ORIGIN = 'https://coronavirus.smartercrowdsourcing.org';
const SITE = 'Smarter Crowdsourcing: Coronavirus';
const PROJECT = 'Smarter Crowdsourcing in the Age of Coronavirus';
const INTRO = 'Smarter Crowdsourcing in the Age of Coronavirus, a 2020 project of The GovLab in collaboration with the Inter-American Development Bank, brought together experts to devise solutions to public health challenges of the COVID-19 pandemic across mitigation, preparedness, response and recovery.';

const publisher = { '@type': 'Organization', '@id': 'https://thegovlab.org/#organization', name: 'The GovLab', url: 'https://thegovlab.org' };
const idb = { '@type': 'Organization', '@id': 'https://www.iadb.org/#organization', name: 'Inter-American Development Bank', url: 'https://www.iadb.org' };
const website = { '@type': 'WebSite', '@id': `${ORIGIN}/#website`, name: SITE, alternateName: PROJECT, url: `${ORIGIN}/`, publisher: { '@id': publisher['@id'] }, inLanguage: 'en' };
const graph = (...nodes) => ({ '@context': 'https://schema.org', '@graph': [website, publisher, idb, ...nodes] });
const crumbs = (...items) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, item], i) => ({ '@type': 'ListItem', position: i + 1, name, item })),
});
const section = (heading, body) => (body ? `## ${heading}\n\n${body}` : '');
const join = (...parts) => parts.filter(Boolean).join('\n\n');
const label = (list, code) => ((list || []).find((x) => x.code === code) || {}).name;
// Navigation, language switch, partner logos and licence badge are not page text.
const CHROME = ['.topnav', '#myLinks', '.lang-select', 'footer', '.copyright', '.recco-tag', '.strategy-tags'];

// Data keys the page script (js/coronavirus.js) loads; a page is seeded with the
// ones its template uses.
const PAGE_KEYS = ['indexData', 'filterData', 'menuData', 'indexTextData', 'indexTextD9Data', 'indexDataTopics', 'reportData', 'productData', 'TeamData', 'ReccoData'];
function seedFor(file) {
  const tpl = path.join(ROOT, 'scripts', 'templates', `${file}.tpl`);
  const source = readFileSync(existsSync(tpl) ? tpl : path.join(ROOT, file), 'utf8');
  const used = PAGE_KEYS.filter((k) => new RegExp(`\\b${k}\\b`).test(source));
  const seed = [...new Set(used.map((k) => (k === 'filterData' ? 'indexData' : k)))];
  return { seed: [...seed, 'meta_content'], ready: seed };
}

function pruneTopicTexts(seed) {
  const keep = ['id', 'topic_title', 'language', 'status'];
  (seed.indexData || []).forEach((st) => (st.strat_topic || []).forEach((t) => ((t.topics_id && t.topics_id.translations) || []).forEach((tr) => {
    ((tr.smc_coronavirus_topics_id && tr.smc_coronavirus_topics_id.translations) || []).forEach((x) => {
      const full = x.smc_coronavirus_topics_translations_id;
      if (full && typeof full === 'object') x.smc_coronavirus_topics_translations_id = Object.fromEntries(keep.filter((k) => k in full).map((k) => [k, full[k]]));
    });
  })));
  return seed;
}

export default {
  origin: ORIGIN,
  siteName: SITE,
  siteId: 'coronavirus-smarter-crowdsourcing',
  source: 'The GovLab (coronavirus.smartercrowdsourcing.org)',
  licence: 'Creative Commons Attribution-ShareAlike 4.0 International License (https://creativecommons.org/licenses/by-sa/4.0/)',
  llmsIntro: `${INTRO} This site publishes its recommendations for governments on six topics (testing strategy, contact tracing, behavioral science, supporting marginalized populations, monitoring, mental health), each with strategies, actions and examples from around the world. Text licensed CC BY-SA 4.0.`,
  twitterSite: '@thegovlab',
  directus: 'https://directus.theburnescenter.org/',

  async pages({ directus, htmlToText, summary, canonicalUrl, md, mdFrom }) {
    const firstSentence = (html, max = 110) => {
      const text = htmlToText(html);
      // First sentence: ends at . ! or ? before a capital letter (not after "e.g." or "i.e.").
      const m = /^(.{20,}?(?<!\be\.g|\bi\.e)[.!?])(?=\s+[A-Z“"(]|$)/.exec(text);
      return summary(m ? m[1] : text, max);
    };
    const h1 = (html) => { const m = /<h1[^>]*>([\s\S]*?)<\/h1>/i.exec(html || ''); return m ? htmlToText(m[1]) : ''; };
    const firstPara = (html) => { const m = /<h1[^>]*>[\s\S]*?<\/h1>\s*<p[^>]*>([\s\S]*?)<\/p>/i.exec(html || ''); return m ? htmlToText(m[1]) : ''; };
    const about = (s) => (s.meta_content ? summary(s.meta_content, 300) : INTRO);

    const recs = await directus('smc_coronavirus_recommendation', { 'filter[status][_eq]': 'published', fields: 'slug', limit: '-1', sort: 'id' });
    const strats = await directus('smc_coronavirus_strategies', { 'filter[status][_eq]': 'published', fields: 'id,slug', limit: '-1', sort: 'id' });
    const stratUrl = (slug) => canonicalUrl(`/strategies/${slug}`);

    // ---- single pages, rendered in place (js/coronavirus.js)
    const single = [
      { file: 'index.html', path: '/', type: 'CollectionPage', mdType: 'GovLab project overview', title: () => PROJECT },
      { file: 'about.html', path: '/about', type: 'AboutPage', mdType: 'GovLab project page', title: () => `About ${PROJECT}` },
      { file: 'topics.html', path: '/topics', type: 'CollectionPage', mdType: 'GovLab project page', title: () => 'Topics' },
      { file: 'team.html', path: '/team', type: 'AboutPage', mdType: 'GovLab project team', title: () => 'Team' },
      { file: 'recommendations.html', path: '/recommendations', type: 'CollectionPage', mdType: 'GovLab recommendations index', title: () => 'Recommendations' },
      { file: 'strategies.html', path: '/strategies', type: 'CollectionPage', mdType: 'GovLab strategies index', title: () => 'Strategies' },
      { file: 'executive-memos.html', path: '/executive-memos', type: 'CollectionPage', mdType: 'GovLab project page', title: () => 'Executive Memos' },
      { file: 'outcomes.html', path: '/outcomes', type: 'WebPage', mdType: 'GovLab project page', title: () => 'Outcomes' },
      ...['testing-strategy', 'contact-tracing', 'behavioral-science', 'supporting-marginalized-populations', 'monitoring', 'mental-health']
        .map((f) => ({ file: `${f}.html`, path: `/${f}`, type: 'Article', mdType: 'GovLab topic page', title: (html) => h1(html) })),
    ].map((p) => ({
      path: p.path, file: p.file, inPlace: true, ...seedFor(p.file),
      // The strategies list shows only each topic's title: drop the long topic
      // texts (about 1 MB) that come with the strategies query.
      pruneSeed: p.file === 'strategies.html' ? pruneTopicTexts : undefined,
      // The home-page banner is hidden by the page script and then faded in line
      // by line; hide it in the static page too, so it does not flash on load.
      postRender: p.file === 'index.html' ? (html) => html.replace(/<p class="imagine-banner"(?![^>]*style=)/, '<p class="imagine-banner" style="display: none;"') : undefined,
      markupNotCompared: p.file === 'index.html' ? 'the banner animates' : undefined,
      head: (s, { html }) => {
        const title = p.title(html);
        const description = firstPara(html) || about(s);
        const url = canonicalUrl(p.path);
        const node = p.type === 'Article'
          ? { '@type': 'Article', headline: title, description: summary(description, 300), url, mainEntityOfPage: url, inLanguage: 'en', author: { '@id': publisher['@id'] }, publisher: { '@id': publisher['@id'] }, isPartOf: { '@id': website['@id'] }, about: { '@type': 'Thing', name: `${title} (COVID-19 response)` } }
          : { '@type': p.type, name: p.path === '/' ? PROJECT : `${title} | ${SITE}`, description: summary(description, 300), url, isPartOf: { '@id': website['@id'] }, publisher: { '@id': publisher['@id'] }, sourceOrganization: [{ '@id': publisher['@id'] }, { '@id': idb['@id'] }] };
        if (p.path === '/recommendations') {
          node.mainEntity = { '@type': 'ItemList', itemListElement: s.ReccoData.map((r, i) => ({ '@type': 'ListItem', position: i + 1, url: canonicalUrl(`/recommendations/${r.slug}`), name: r.title_en })) };
        }
        return {
          title: p.path === '/' ? `${PROJECT} | ${SITE}` : `${title} | ${SITE}`,
          description: summary(description),
          ogType: p.type === 'Article' ? 'article' : 'website',
          jsonld: p.path === '/' ? graph(node) : graph(node, crumbs([SITE, `${ORIGIN}/`], [title, url])),
        };
      },
      markdown: (s, { html }) => {
        const title = p.title(html);
        // The page's own <h1> repeats the title.
        const body = mdFrom(html, CHROME).replace(/^## (.+)\n+/, (m, h) => (h.trim().toLowerCase() === title.toLowerCase() ? '' : m));
        return { type: p.mdType, title, summary: firstPara(html) || about(s), body };
      },
    }));

    // ---- recommendations/<slug> (js/recco.js)
    const recPages = recs.map(({ slug }) => ({
      path: `/recommendations/${slug}`, file: `recommendations/${slug}.html`, template: 'recommendations/index.html',
      seed: ['ReccoData', 'menuData', 'indexTextD9Data'],
      head: (s) => {
        const r = s.ReccoData[0];
        const url = canonicalUrl(`/recommendations/${slug}`);
        return {
          title: `${r.title_en} | ${SITE}`,
          description: summary(r.description_en),
          ogType: 'article',
          jsonld: graph({
            '@type': 'Report', '@id': `${url}#report`, name: r.title_en, description: summary(r.description_en, 300), url, mainEntityOfPage: url,
            inLanguage: 'en', author: [{ '@id': publisher['@id'] }], publisher: { '@id': publisher['@id'] }, sourceOrganization: { '@id': idb['@id'] },
            isPartOf: { '@id': website['@id'] }, about: { '@type': 'Thing', name: 'Government response to the COVID-19 pandemic' },
            hasPart: r.strategies.map((x) => ({ '@type': 'CreativeWork', name: firstSentence(x.strategies_id.description_en), url: x.strategies_id.slug ? stratUrl(x.strategies_id.slug) : undefined })),
          }, crumbs([SITE, `${ORIGIN}/`], ['Recommendations', canonicalUrl('/recommendations')], [r.title_en, url])),
        };
      },
      markdown: (s) => {
        const r = s.ReccoData[0];
        const list = (items, key) => items.map((x, i) => `${i + 1}. ${md(x[key].description_en).replace(/\n/g, '\n   ')}`).join('\n');
        return {
          type: 'GovLab policy recommendation',
          title: r.title_en,
          summary: htmlToText(r.description_en),
          body: join(
            md(r.description_en),
            `- Part of: [${PROJECT}](${ORIGIN}/), [all recommendations](${canonicalUrl('/recommendations')})`,
            ...r.strategies.map((x, i) => {
              const st = x.strategies_id;
              return join(
                `## Strategy ${i + 1}`,
                md(st.description_en),
                [
                  label(s.js_timeline_en, st.timeline) && `- Timeframe: ${label(s.js_timeline_en, st.timeline)}`,
                  (st.audience || []).some((a) => label(s.js_audience_en, a)) && `- Audience: ${st.audience.map((a) => label(s.js_audience_en, a)).filter(Boolean).join(', ')}`,
                  (st.area || []).some((a) => label(s.js_type_en, a)) && `- Type: ${st.area.map((a) => label(s.js_type_en, a)).filter(Boolean).join(', ')}`,
                  st.slug && `- Strategy page: ${stratUrl(st.slug)}`,
                ].filter(Boolean).join('\n'),
                section(`Actions governments should take (strategy ${i + 1})`, list(st.actions || [], 'actions_id')).replace(/^## /, '### '),
                section(`Examples from around the world (strategy ${i + 1})`, list(st.examples || [], 'examples_id')).replace(/^## /, '### '),
              );
            }),
          ),
        };
      },
    }));

    // ---- strategies/<slug> (js/strategies.js). Two slugs contain "/": their
    // pages are nested files with root-relative links, rendered from a URL with
    // the "/" encoded so the page script can still read the slug.
    const seen = new Set();
    const duplicates = [];
    const stratPages = [];
    for (const { id, slug } of strats) {
      if (!slug) continue;
      if (seen.has(slug)) { duplicates.push({ id, slug }); continue; }
      seen.add(slug);
      const nested = slug.includes('/');
      stratPages.push({
        path: `/strategies/${slug}`, file: `strategies/${slug}.html`, template: 'strategies/index.html',
        seed: ['stratData', 'menuData', 'indexTextD9Data'],
        renderUrl: `/strategies/${encodeURIComponent(slug)}`,
        transformSource: nested
          ? (src) => src.replace(/(=\s*["'])\.\.\//g, '$1/').replace(/'\.\.\//g, "'/").replace(/src="js\//g, 'src="/strategies/js/')
          : undefined,
        head: (s) => {
          const st = s.stratData[0];
          const url = stratUrl(slug);
          const name = firstSentence(st.description_en);
          return {
            title: `${name} | ${SITE}`,
            description: summary(st.description_en),
            ogType: 'article',
            jsonld: graph({
              '@type': 'CreativeWork', '@id': `${url}#strategy`, name, description: summary(st.description_en, 300), url, mainEntityOfPage: url,
              inLanguage: 'en', author: { '@id': publisher['@id'] }, publisher: { '@id': publisher['@id'] }, isPartOf: [{ '@id': website['@id'] },
                ...(st.strat_rec || []).filter((x) => x.recommendation_id).map((x) => ({ '@type': 'Report', name: x.recommendation_id.title_en, url: canonicalUrl(`/recommendations/${x.recommendation_id.slug}`) }))],
            }, crumbs([SITE, `${ORIGIN}/`], ['Strategies', canonicalUrl('/strategies')], [name, url])),
          };
        },
        markdown: (s) => {
          const st = s.stratData[0];
          const list = (items, key) => (items || []).filter((x) => x[key]).map((x, i) => `${i + 1}. ${md(x[key].description_en).replace(/\n/g, '\n   ')}`).join('\n');
          return {
            type: 'GovLab policy strategy',
            title: firstSentence(st.description_en),
            summary: htmlToText(st.description_en),
            body: join(
              md(st.description_en),
              [
                label(s.js_timeline_en, st.timeline) && `- Timeframe: ${label(s.js_timeline_en, st.timeline)}`,
                (st.audience || []).some((a) => label(s.js_audience_en, a)) && `- Audience: ${st.audience.map((a) => label(s.js_audience_en, a)).filter(Boolean).join(', ')}`,
                (st.area || []).some((a) => label(s.js_type_en, a)) && `- Type: ${st.area.map((a) => label(s.js_type_en, a)).filter(Boolean).join(', ')}`,
                ...(st.strat_rec || []).filter((x) => x.recommendation_id).map((x) => `- Recommendation: [${x.recommendation_id.title_en}](${canonicalUrl(`/recommendations/${x.recommendation_id.slug}`)})`),
                `- Part of: [${PROJECT}](${ORIGIN}/)`,
              ].filter(Boolean).join('\n'),
              section('Actions governments should take', list(st.actions, 'actions_id')),
              section('Examples from around the world', list(st.smc_coronavirus_examples, 'examples_id')),
            ),
          };
        },
      });
    }
    if (duplicates.length) console.log(`strategy slugs used twice (only the first is rendered, as on the live site): ${duplicates.map((d) => `${d.slug} (id ${d.id})`).join(', ')}`);

    return [...single, ...recPages, ...stratPages];
  },
};
