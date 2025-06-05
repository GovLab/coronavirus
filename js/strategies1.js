// strategies.js (or strategies1.js)

// ... (keep existing code: reload page, Vue.use(VueMeta), etc.) ...

const TYPE_BACK_FORWARD = 2;

function isReloadedPage() {
  return performance.navigation.type === TYPE_BACK_FORWARD;
}

function main() {
  if (isReloadedPage()) {
    window.location.reload();
  }
}
main();

Vue.use(VueMeta);

new Vue({
  el: '#home-page',
  data() {
    return {
      indexTextD9Data: [],
      menuData: [],
      stratData: [],
      showExample: false,
      showAction: false,
      index_active: 0,
      langsel: 'en',
      apiURLd9: 'https://directus.theburnescenter.org/', // INITIALIZED!
      // apiURL: 'https://directus.thegovlab.com/smarter-crowdsourcing', // If you use this, initialize it too
      memberslug: 'Partner-with-academic-institutions,researchers-and', // INITIALIZED - will be set in created()

      // Your js_... arrays
      js_audience_en: [
        { code: '', name: 'All' },
        { code: 'audience_1', name: 'Private Sector' },
        { code: 'audience_2', name: 'Academia' },
        { code: 'audience_3', name: 'Civil Society' },
        { code: 'audience_4', name: 'Vulnerable Populations' },
        { code: 'audience_5', name: 'Healthcare Providers' },
        { code: 'audience_6', name: 'Essential Workers' },
        { code: 'audience_7', name: 'Government Workers' },
        { code: 'audience_8', name: 'Organized Civil Society' },
        { code: 'audience_9', name: 'Nonprofits' },
      ],
      js_type_en: [
        { code: '', name: 'All' },
        { code: 'area_1', name: 'Research' },
        { code: 'area_2', name: 'Policy/Legislative/Regulatory' },
        { code: 'area_3', name: 'Data' },
        { code: 'area_4', name: 'Technology/Innovation' },
        { code: 'area_5', name: 'Communications' },
        { code: 'area_6', name: 'Partnerships' },
        { code: 'area_7', name: 'Capacity Building' },
        { code: 'area_8', name: 'Vulnerable Populations' },
        { code: 'area_9', name: 'Procurement/Logistics' },
      ],
      js_timeline_en: [
        { code: '', name: 'All' },
        { code: 'timeline_1', name: '1-3 Months (immediate)' },
        { code: 'timeline_2', name: '3-6 Months (medium)' },
        { code: 'timeline_3', name: '6-12 Months (long)' },
        { code: 'timeline_4', name: '1+ years (structural change)' },
      ],
      js_topic_en: [
        { code: '', name: 'All' },
        { code: 'topic_1', name: 'Testing Strategy' },
        { code: 'topic_2', name: 'Contact Tracing' },
        { code: 'topic_3', name: 'Behavioral Science and COVID' },
        { code: 'topic_4', name: 'Supporting Marginalized and Vulnerable Populations' },
        { code: 'topic_5', name: 'Epidemiological monitoring and surveillance' },
        { code: 'topic_6', name: 'Mental health and emotional wellbeing' },
      ],
      js_audience_pt: [
        { code: '', name: 'All' },
        { code: 'audience_1', name: 'Setor privado' },
        { code: 'audience_2', name: 'Academia' },
        { code: 'audience_3', name: 'Sociedade civil' },
        { code: 'audience_4', name: 'Populações vulneráveis' },
        { code: 'audience_5', name: 'Provedores de serviços de saúde' },
        { code: 'audience_6', name: 'Trabalhadores essenciais' },
        { code: 'audience_7', name: 'Funcionários governamentais' },
        { code: 'audience_8', name: 'Sociedade civil organizada' },
        { code: 'audience_9', name: 'Organizações sem fins lucrativos' },
      ],
      js_type_pt: [
        { code: '', name: 'All' },
        { code: 'area_1', name: 'Pesquisa' },
        { code: 'area_2', name: 'Políticas/Regulamentação/Legislação' },
        { code: 'area_3', name: 'Dados' },
        { code: 'area_4', name: 'Tecnologia/Inovação' },
        { code: 'area_5', name: 'Comunicações' },
        { code: 'area_6', name: 'Parcerias' },
        { code: 'area_7', name: 'Criação de capacidade' },
        { code: 'area_8', name: 'Populações Vulneráveis' },
        { code: 'area_9', name: 'Contratação/Logísticas' },
      ],
      js_timeline_pt: [
        { code: '', name: 'All' },
        { code: 'timeline_1', name: '1-3 meses (imediato)' },
        { code: 'timeline_2', name: '3-6 meses (médio)' },
        { code: 'timeline_3', name: '6-12 meses (longo)' },
        { code: 'timeline_4', name: '1+ anos (mudança estrutural)' },
      ],
      js_topic_pt: [
        { code: '', name: 'All' },
        { code: 'topic_1', name: 'Estratégia de Testagem' },
        { code: 'topic_2', name: 'Rastreamento de Contatos' },
        { code: 'topic_3', name: 'Ciências Comportamentais' },
        { code: 'topic_4', name: 'Apoiar Comunidades Marginalizadas e Vulneráveis' },
        { code: 'topic_5', name: 'Monitoramento e Vigilância Epidemiológicos' },
        { code: 'topic_6', name: 'Saúde Mental e Bem-Estar Emocional' },
      ],
      js_audience_es: [
        { code: '', name: 'All' },
        { code: 'audience_1', name: 'Sector privado' },
        { code: 'audience_2', name: 'Academia' },
        { code: 'audience_3', name: 'Sociedad Civil' },
        { code: 'audience_4', name: 'Poblaciones vulnerables' },
        { code: 'audience_5', name: 'profesionales de la salud' },
        { code: 'audience_6', name: 'Trabajadores esenciales' },
        { code: 'audience_7', name: 'Trabajadores esenciales' }, // Note: audience_7 is "Trabajadores esenciales" again, might be a typo in original data
        { code: 'audience_8', name: 'Sociedad Civil Organizada' },
        { code: 'audience_9', name: 'Organizaciones sin fines de lucro' },
      ],
      js_type_es: [
        { code: '', name: 'All' },
        { code: 'area_1', name: 'Investigación' },
        { code: 'area_2', name: 'Politicas/Regulación/Legislación' },
        { code: 'area_3', name: 'Datos' },
        { code: 'area_4', name: 'Tecnología/Innovación' },
        { code: 'area_5', name: 'Comunicaciones' },
        { code: 'area_6', name: 'Partenariado' },
        { code: 'area_7', name: 'Generación de capacidades' },
        { code: 'area_8', name: 'Poblaciones vulnerables' },
        { code: 'area_9', name: 'Contratos/Logistica ' },
      ],
      js_timeline_es: [
        { code: '', name: 'All' },
        { code: 'timeline_1', name: '1-3 meses (inmediato)' },
        { code: 'timeline_2', name: '3-6 meses (medio)' },
        { code: 'timeline_3', name: '6-12 meses (largo)' },
        { code: 'timeline_4', name: '1+ años (cambios estructurales)' },
      ],
      js_topic_es: [
        { code: '', name: 'All' },
        { code: 'topic_1', name: 'Estrategia para la Realización de Pruebas' },
        { code: 'topic_2', name: 'Ratreo de Contactos ' },
        { code: 'topic_3', name: 'Ciencias del Comportamiento ' },
        { code: 'topic_4', name: 'Apoyando a las Poblaciones Marginadas y Vulnerables' },
        { code: 'topic_5', name: 'Monitoreo y vigilancia' },
        { code: 'topic_6', name: 'Salud Mental y Bienestar Emocional' },
      ],
    };
  },
  watch: {
    langsel: function () {
      this.$cookies.set('lang', this.langsel);
    },
  },
  created: function created() {
    let pathArray = window.location.pathname.split('/');
    // Filter out empty strings that can result from trailing slashes or multiple slashes
    pathArray = pathArray.filter(segment => segment.length > 0);
    this.memberslug = pathArray.length > 0 ? pathArray[pathArray.length - 1] : '';

    // If the last segment is an HTML file, try to get the segment before it,
    // or adjust based on your actual URL structure for slugs.
    if (this.memberslug.endsWith('.html') && pathArray.length > 1) {
        this.memberslug = pathArray[pathArray.length - 2];
    }
    
    // FOR TESTING: Uncomment this line and comment the above parsing if you want to force a slug
    // this.memberslug = "Partner-with-academic-institutions,researchers-and";

    this.$cookies.get('lang') != null ? this.langsel = this.$cookies.get('lang') : this.$cookies.set('lang', this.langsel);

    console.log("Current slug:", this.memberslug); // Check this output

    if (!this.apiURLd9) {
        console.error("apiURLd9 is not defined! Check data() in Vue instance.");
        return; // Stop further execution if critical config is missing
    }

    this.fetchStrategies();
    this.fetchElements();
    this.fetchMenu();
  },
  methods: {
    fetchStrategies() {
      const self = this; // 'self' is good practice, or use arrow functions for Axios
      if (!self.memberslug) {
        console.warn("No memberslug found, cannot fetch specific strategy.");
        self.stratData = []; // Ensure stratData is an empty array
        return;
      }
      // Ensure apiURLd9 ends with a slash if it doesn't already, and items/ doesn't start with one
      const endpoint = "items/smc_coronavirus_strategies?fields=*,strat_rec.recommendation_id.*,strat_topic.topics_id.translations.smc_coronavirus_topics_translations_id.*,actions.actions_id.*,examples.examples_id.*&filter[slug]=" + self.memberslug;
      const fullUrl = (self.apiURLd9.endsWith('/') ? self.apiURLd9 : self.apiURLd9 + '/') + endpoint;
      
      axios.get(fullUrl)
        .then(response => { // Changed 'data' to 'response' to avoid confusion with response.data
          console.log("Strategies Data:", response.data);
          if (response.data && response.data.data && response.data.data.length > 0) {
            self.stratData = response.data.data;
          } else {
            self.stratData = [];
            console.warn("No strategy data found for slug:", self.memberslug);
          }
        }).catch(error => {
          console.error("Error fetching strategies:", error.response || error.request || error.message, error);
          self.stratData = [];
        });
    },
    fetchElements() {
      const self = this;
      const endpoint = "items/smc_coronavirus_homepage?fields=*,translations.*";
      const fullUrl = (self.apiURLd9.endsWith('/') ? self.apiURLd9 : self.apiURLd9 + '/') + endpoint;

      axios.get(fullUrl).then(response => {
        console.log("Elements Data:", response.data);
        if (response.data && response.data.data) {
            self.indexTextD9Data = response.data.data;
        } else {
            self.indexTextD9Data = [];
        }
      }).catch(error => {
        console.error("Error fetching elements:", error.response || error.request || error.message, error);
        self.indexTextD9Data = [];
      });
    },
    fetchMenu() {
      const self = this;
      const endpoint = "items/smc_coronavirus_menu?fields=*,translations.*";
      const fullUrl = (self.apiURLd9.endsWith('/') ? self.apiURLd9 : self.apiURLd9 + '/') + endpoint;

      axios.get(fullUrl).then(response => {
        console.log("Menu Data:", response.data);
        if (response.data && response.data.data) {
            self.menuData = response.data.data;
        } else {
            self.menuData = [];
        }
      }).catch(error => {
        console.error("Error fetching menu:", error.response || error.request || error.message, error);
        self.menuData = [];
      });
    },
    toggleMessage(index, type) {
      this.index_active = index;
      if (type == 1) {
        this.showExample = !this.showExample;
        if (this.showExample) this.showAction = false; // Optional: close other accordion
      } else {
        this.showAction = !this.showAction;
        if (this.showAction) this.showExample = false; // Optional: close other accordion
      }
    },
    langidd9(itemWithTranslations) {
      if (!itemWithTranslations || !itemWithTranslations.translations || !Array.isArray(itemWithTranslations.translations)) {
        // console.warn("langidd9: Invalid item or translations array", itemWithTranslations);
        return 0;
      }
      const trIndex = itemWithTranslations.translations.findIndex(a => {
        return a.languages_code && a.languages_code.split('-')[0] == this.langsel;
      });
      return trIndex > -1 ? trIndex : 0;
    },
    getTopicTranslation(topicItem, property) {
      if (!topicItem || !topicItem.topics_id || !topicItem.topics_id.translations || !Array.isArray(topicItem.topics_id.translations)) {
        return `[${property} invalid topicItem]`;
      }
      const translations = topicItem.topics_id.translations;
      const foundTranslation = translations.find(t =>
        t.smc_coronavirus_topics_translations_id &&
        t.smc_coronavirus_topics_translations_id.language === this.langsel &&
        t.smc_coronavirus_topics_translations_id.status === 'published'
      );

      if (foundTranslation && foundTranslation.smc_coronavirus_topics_translations_id) {
        return foundTranslation.smc_coronavirus_topics_translations_id[property] || `[${property} missing]`;
      }
      
      const fallbackTranslation = translations.find(t =>
        t.smc_coronavirus_topics_translations_id &&
        t.smc_coronavirus_topics_translations_id.status === 'published'
      );
      if (fallbackTranslation && fallbackTranslation.smc_coronavirus_topics_translations_id) {
        return fallbackTranslation.smc_coronavirus_topics_translations_id[property] || `[${property} fallback missing]`;
      }
      
      if (translations.length > 0 && translations[0].smc_coronavirus_topics_translations_id) {
         return translations[0].smc_coronavirus_topics_translations_id[property] || `[${property} abs fallback missing]`;
      }
      
      return `[${property} not found]`;
    },
    filterId(prefix, code) {
      const listName = prefix + this.langsel;
      if (this[listName] && Array.isArray(this[listName]) && code) {
        const item = this[listName].find(a => a.code === code);
        return item ? item.name : code;
      }
      // console.warn(`filterId: List ${listName} not found or code is invalid for prefix: ${prefix}, code: ${code}`);
      return code;
    }
  }
});