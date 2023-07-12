////////////////////////////////////////
// reload page after Forward and back
///////////////////////////////////////

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

////////////////////////////////////////////////////////////
///// TEAM  API REQUEST ` `
////////////////////////////////////////////////////////////


Vue.use(VueMeta);

new Vue({
    
  el: '#home-page',
    
  data () {
  
    return {
      indexTextD9Data: [],
      menuData: [],
      stratData: [],
      showExample: false,
      showAction: false,
      index_active:0,
      langsel:'en',
      apiURLd9: 'https://content.smartercrowdsourcing.org/',
      apiURL: 'https://directus.thegovlab.com/smarter-crowdsourcing',
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
        { code: 'audience_7', name: 'Trabajadores esenciales' },
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
    }
  },
  watch: {
    langsel: function () {
      this.$cookies.set('lang',this.langsel);
    },
  },
  created: function created() {
    this.memberslug=window.location.href.split('/');
    this.memberslug = this.memberslug[this.memberslug.length - 1];    
    // this.memberslug = "Promote-and-use-open-source-and-simple-tools-for-d";
    this.$cookies.get('lang')!= null ? this.langsel = this.$cookies.get('lang') : this.$cookies.set('lang',this.langsel);

    console.log(this.memberslug);

    this.fetchStrategies();
    this.fetchElements();
    this.fetchMenu();
  },
  methods: {

    fetchStrategies() {

      self = this;
      axios.get(this.apiURLd9+"items/strategies?fields=*,strat_rec.recommendation_id.*,strat_topic.topics_id.translations.*,actions.actions_id.*,examples.examples_id.*&filter[slug]="+self.memberslug).then(data => {
        console.log(data.data)
        
        self.stratData = data.data.data;

      }).catch(error => console.error(error));
      const client = new DirectusSDK({
        url: "https://directus.thegovlab.com/",
        project: "smarter-crowdsourcing",
        storage: window.localStorage
      });

      // client.getItems(
      //   'strategies',
      //   {
      //     filter: {
      //       slug: self.memberslug
      //     },
      //     fields: ['*.*','strat_rec.recommendation_id.*','strat_topic.topics_id.translations.*','actions.actions_id.*','examples.examples_id.*']
      //   }
      // ).then(data => {
      //   console.log(data)
      //   self.stratData = data.data;
      // })
      //   .catch(error => console.error(error));
    },
    fetchElements() {
      axios.get(this.apiURLd9+"items/homepage?fields=*,translations.*").then(data => {
        
        self.indexTextD9Data = data.data.data;
      }).catch(error => console.error(error));
    },
    fetchMenu() {
      self = this;
      axios.get(this.apiURLd9+"items/menu?fields=*,translations.*").then(data => {
        self.menuData = data.data.data;
      })
        .catch(error => console.error(error));
    },
    toggleMessage (index,type) {
      
      this.index_active = index;
      if (type == 1){
        this.showExample = !this.showExample;
      }
    
      else
      {
      this.showAction = !this.showAction;
    }
    console.log(this.index_active);
    },
    langidd9(tr){
      const trIndex = tr.translations.findIndex(a=>{  return a.languages_code.split('-')[0]==this.langsel})
      return trIndex;
    },
    langid(tr){
      const trIndex = tr.translations.findIndex(a=>{  return a.status == 'published' && a.language == this.langsel  })
      return trIndex;
    },
    filterId(tr, el){
      console.log(tr,el);
      
      const trIndex = this[(tr+this.langsel)].findIndex(a=>{  return a.code==el})
      return this[(tr+this.langsel)][trIndex].name;
    }
}
});

