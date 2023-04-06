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
// Vue.use(VueCookies);

new Vue({

  el: '#home-page',

  data() {

    return {
      indexData: [],
      expertData: [],
      na_count: 0,
      sa_count: 0,
      af_count: 0,
      menuData: [],
      indexTextData: [],
      indexTextD9Data: [],
      indexDataTopics:[],
      reportData: [],
      productData:[],
      TeamData: [],
      ReccoData: [],
      langsel:'en',
      apiURL: 'https://directus.thegovlab.com/smarter-crowdsourcing',
      apiURLd9: 'https://d9.sc.thegovlab.com/',
      miStr: { 'en':'More Information', 'es':'Más información', 'pt':'Mais Informações'},
      target: [],
      items: [],
      counter: 0,
      meta_title:'',
      meta_content:'',

      // Filter page 
      filterData: [],
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
  metaInfo () {
    return {
      title: "Smarter Crowdsourcing in the Age of Coronavirus",
      meta: [
        {title: "Smarter Crowdsourcing in the Age of Coronavirus", property:'og:title'},
  {  name: 'description', content: this.meta_content, property:'og:description'}
]
}
},
  watch: {
    langsel: function () {
      this.$cookies.set('lang',this.langsel);
    },
  },
  updated: function () {
    // a computed getter
    this.$nextTick(function () {
      this.target = $('.imagine-banner').hide()
      this.items = $('.imagine-banner').children()
      console.log('items',$('.imagine-banner'));
  this.bannerFade();
    })
  },
  created: function created() {
    // console.log('cookies', this.$cookies);
    this.$cookies.get('lang')!= null ? this.langsel = this.$cookies.get('lang') : this.$cookies.set('lang',this.langsel);
    this.fetchIndex();
    this.fetchMapExperts();
    this.fetchMenu();
    this.fetchProducts();
    this.fetchReports();
    this.fetchIndexText();
    this.fetchTeamData();
    this.fetchRecommendations();
    this.fetchStrategies();



  },
 

  methods: {
    bannerFade() {
      self = this;
      console.log(this.target);
      this.target.fadeIn(2000).delay( 1500 ).fadeOut(2000,function() {
        self.bannerFade();
      }).html(this.items[this.counter++]);
      console.log(this.counter)
      if (this.counter == this.items.length) {
        this.counter = 0;
      } 
  },
    fetchMapExperts(){
      self = this;

      const client = new DirectusSDK({
        url: "https://directus.thegovlab.com/",
        project: "smarter-crowdsourcing",
        storage: window.localStorage
      });

      // axios.get(
      //   'experts',
      //   {
      //     fields: ['*.*','topic.topics_id.*']
      //   }
      // ).
      
      axios.get('https://directus.thegovlab.com/smarter-crowdsourcing/items/experts').then(data => {
        console.log(data.data.data)
        data = data.data;
        self.expertData = data.data;
        self.euData = self.expertData.filter(items => items.region == "eu");
        self.eu_count = self.euData.length;
        self.saData = self.expertData.filter(items => items.region == "sa");
        self.sa_count = self.saData.length;
        self.naData = self.expertData.filter(items => items.region == "na");
        self.na_count = self.naData.length;
        self.afData = self.expertData.filter(items => items.region == "afr");
        self.af_count = self.afData.length;
        self.asData = self.expertData.filter(items => items.region == "as");
        self.as_count = self.asData.length;
        self.ocaData = self.expertData.filter(items => items.region == "oca");
        self.oca_count = self.ocaData.length;
        this.fetchMap(self.eu_count,self.sa_count,self.na_count,self.af_count,self.as_count,self.oca_count);
      })
        .catch(error => console.error(error));
    },
    fetchMenu() {
      self = this;
      axios.get(this.apiURLd9+"items/menu?fields=*,translations.*").then(data => {
        console.log("menu", data)
        self.menuData = data.data.data;
      })
        .catch(error => console.error(error));
    },
    
    fetchIndex() {
      self = this;
      // const client = new DirectusSDK({
      //   url: "https://directus.thegovlab.com/",
      //   project: "smarter-crowdsourcing",
      //   storage: window.localStorage
      // });

      // client.getItems(
      //   'topics',
      //   {
      //     fields: ['*.*', 'translations.*', 'translations.memo_image.*', 'translations.executive_memo.*']
      //   }
      // ).then(data => {
      //   console.log(data)
      //   self.indexData = data.data;
      // })

    axios.get(this.apiURLd9+"items/topics?fields=*,translations.*,translations.memo_image.*,translations.executive_memo.*,translation_el.*,translation_el.topic_elements.*").then(data => {
        
        self.indexDataTopics = data.data.data;
      })
        .catch(error => console.error(error));
    },
    fetchReports() {
      self = this;
      axios.get(this.apiURLd9+"items/reports?fields=*").then(data => {
        console.log("report", data)
        self.reportData = data.data.data;
      })
        .catch(error => console.error(error));
      // const client = new DirectusSDK({
      //   url: "https://directus.thegovlab.com/",
      //   project: "smarter-crowdsourcing",
      //   storage: window.localStorage
      // });

      // client.getItems(
      //   'reports',
      //   {
      //     fields: ['*.*']
      //   }
      // ).then(data => {
      //   self.reportData = data.data;
      // })
      //   .catch(error => console.error(error));
    },
    fetchProducts() {
      self = this;
      axios.get(this.apiURLd9+"items/products?fields=*,translation.*").then(data => {
        
        self.productData = data.data.data;

      }).catch(error => console.error(error));
      
      // const client = new DirectusSDK({
      //   url: "https://directus.thegovlab.com/",
      //   project: "smarter-crowdsourcing",
      //   storage: window.localStorage
      // });

      // client.getItems(
      //   'products',
      //   {
      //     fields: ['*.*', 'translation.*']
      //   }
      // ).then(data => {
      //   console.log('productData',data.data)
      //   self.productData = data.data;
      // })
      //   .catch(error => console.error(error));
    },
    fetchIndexText() {
      self = this;
      axios.get(this.apiURLd9+"items/homepage_translations?fields=*,title_relation.*,title_relation.translations.*").then(data => {
        
        
        self.indexTextData = data.data.data;
        self.meta_content= self.indexTextData.filter(a=>{ if(a.title_relation && a.title_relation.title == 'About' && a.language == "en") return a})[0].body
    

        
        // self.meta_title = data.data.data.title
      }).catch(error => console.error(error));

      axios.get(this.apiURLd9+"items/homepage?fields=*,translations.*").then(data => {
        
        self.indexTextD9Data = data.data.data;
      
        

      }).catch(error => console.error(error));
      // const client = new DirectusSDK({
      //   url: "https://directus.thegovlab.com/",
      //   project: "smarter-crowdsourcing",
      //   storage: window.localStorage
      // });

      // client.getItems(
      //   'homepage',
      //   {
      //     fields: ['*.*']
      //   }
      // ).then(data => {
      //   console.log(data)
      //   self.indexTextData = data.data;

      // })
      //   .catch(error => console.error(error));
    },
    fetchTeamData() {
      self = this;

      axios.get(this.apiURLd9+"items/team?fields=*").then(data => {
        
        self.TeamData = data.data.data;

      }).catch(error => console.error(error));
      // const client = new DirectusSDK({
      //   url: "https://directus.thegovlab.com/",
      //   project: "smarter-crowdsourcing",
      //   storage: window.localStorage
      // });

      // client.getItems(
      //   'team',
      //   {
      //     fields: ['*.*'],
      //   }
      // ).then(data => {
      //   console.log(data)
      //   self.TeamData = data.data;

      // })
      //   .catch(error => console.error(error));
    },
    fetchRecommendations() {
      self = this;
      // const client = new DirectusSDK({
      //   url: "https://directus.thegovlab.com/",
      //   project: "smarter-crowdsourcing",
      //   storage: window.localStorage
      // });
      axios.get(this.apiURLd9+"items/recommendation?fields=*,strategies.strategies_id.*,topic.topics_id.translations.*,strategies.strategies_id.actions.actions_id.*,strategies.strategies_id.examples.examples_id.*").then(data => {
        console.log(data.data)
        
        self.ReccoData = data.data.data;

      }).catch(error => console.error(error));

      // client.getItems(
      //   'recommendation',
      //   {
      //     fields: ['*.*', 'strategies.strategies_id.*', 'topic.topics_id.translations.*', 'strategies.strategies_id.actions.actions_id.*', 'strategies.strategies_id.examples.examples_id.*'],
      //   }
      // ).then(data => {
      //   console.log(data)
      //   self.ReccoData = data.data;
      // })
    
    },
    fetchMap(eu_count,sa_count,na_count,af_count,as_count,oca_count) {
      self = this;
      self.europe_count = eu_count;
      self.asia_count = as_count;
      self.northamerica_count = na_count;
      self.southamerica_count= sa_count;
      self.africa_count = af_count;
      self.oceania_count = oca_count;

  /**
 * ---------------------------------------

 * For more information visit:
 * https://www.amcharts.com/
 * 
 * Documentation is available at:
 * https://www.amcharts.com/docs/v4/
 * ---------------------------------------
 */

      // Themes begin
      am4core.useTheme(am4themes_animated);
      // Themes end
  
      // Create map instance
      var chart = am4core.create("chartdiv", am4maps.MapChart);
      chart.geodata = am4geodata_continentsLow;
      chart.projection = new am4maps.projections.Miller();

      // Colors
      var color1 = chart.colors.getIndex(0);

      chart.homeGeoPoint = {
        latitude: 50,
        longitude: 0
      }
      chart.homeZoomLevel = 0.75;
      chart.minZoomLevel = 0.75;
      chart.maxZoomLevel = 0.75;
      chart.seriesContainer.draggable = false;
      chart.seriesContainer.resizable = false;
      // Create map polygon series
      var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
      polygonSeries.exclude = ["antarctica"];
      polygonSeries.useGeodata = true;

      // Configure series
      var polygonTemplate = polygonSeries.mapPolygons.template;
      polygonTemplate.fill = am4core.color("#f8f8f810");
      polygonTemplate.stroke = am4core.color("#2c4758");


      // Pins
      var imageSeries = chart.series.push(new am4maps.MapImageSeries());
      var imageTemplate = imageSeries.mapImages.template;
      imageTemplate.propertyFields.longitude = "longitude";
      imageTemplate.propertyFields.latitude = "latitude";
      imageTemplate.nonScaling = true;

      // Creating a pin bullet
      var pin = imageTemplate.createChild(am4plugins_bullets.PinBullet);

      // Configuring pin appearance
      pin.background.fill = am4core.color("#FFAA00");
      pin.background.pointerBaseWidth = 1;
      pin.background.pointerLength = 250;
      pin.background.propertyFields.pointerLength = "length";
      pin.circle.fill = am4core.color("#FFAA00");
      pin.label = new am4core.Label();
      pin.label.text = "{value}";
      pin.label.fill = am4core.color("#ffffff");

      var label = pin.createChild(am4core.Label);
      // label.text = "{title}";
      label.fontWeight = "bold";
      label.propertyFields.dy = "length";
      label.verticalCenter = "middle";
      label.fill = color1;
      label.adapter.add("dy", function (dy) {
        return (20 + dy) * -1;
      });

      // Creating a "heat rule" to modify "radius" of the bullet based
      // on value in data
      imageSeries.heatRules.push({
        "target": pin.background,
        "property": "radius",
        "min": 20,
        "max": 30,
        "dataField": "value"
      });

      imageSeries.heatRules.push({
        "target": label,
        "property": "dx",
        "min": 30,
        "max": 40,
        "dataField": "value"
      });

      imageSeries.heatRules.push({
        "target": label,
        "property": "paddingBottom",
        "min": 0,
        "max": 10,
        "dataField": "value"
      });

      // Pin data
      imageSeries.data = [{
        "latitude": 40,
        "longitude": -101,
        "value": self.northamerica_count,
        "title": "North\nAmerica",
        "length": 150
      }, {
        "latitude": 0,
        "longitude": 25,
        "value": self.africa_count,
        "title": "Africa",
        "length": 40
      }, {
        "latitude": 43,
        "longitude": 5,
        "value": self.europe_count,
        "title": "European\nUnion",
        "length": 100
      }, {
        "latitude": -20,
        "longitude": -60,
        "value": self.southamerica_count,
        "title": "South\nAmerica",
        "length": 100
      }, {
        "latitude": -20,
        "longitude": 140,
        "value": self.oceania_count,
        "title": "Oceania",
        "length": 100
      }, {
        "latitude": 40,
        "longitude": 95,
        "value": self.asia_count,
        "title": "Asia",
        "length": 80
      }];
    },
    langid(tr){
      const trIndex = tr.translations.findIndex(a=>{  return a.status == 'published' && a.language == this.langsel})
      
      return trIndex;
    },
    langidd9(tr){
      const trIndex = tr.translations.findIndex(a=>{  return a.languages_code.split('-')[0]==this.langsel})
      console.log('index',trIndex);
      return trIndex;
    },
    langIdD9El(tr){
      const trIndex = tr.translation_el.findIndex(a=>{  return a.languages_code.split('-')[0]==this.langsel})
      return trIndex;
    },
    fetchStrategies() {

      self = this;
      // const client = new DirectusSDK({
      //   url: "https://directus.thegovlab.com/",
      //   project: "smarter-crowdsourcing",
      //   storage: window.localStorage
      // });

      // client.getItems(
      //   'strategies',
      //   {
      //     fields: ['*.*','strat_rec.recommendation_id.*','strat_topic.topics_id.translations.*']
      //   }
      // ).then(data => {

        // self.indexData = data.data;
   //Most recently added first
      //   self.indexData = self.indexData.sort(function(a, b){
      //       return (b.id > a.id) ? 1 : -1;});
        

      // })
      //   .catch(error => console.error(error));

      self = this;
      axios.get(this.apiURLd9+"items/strategies?fields=*,strat_rec.recommendation_id.*,strat_topic.topics_id.translations.*").then(data => {
        self.indexData = data.data.data;
        self.filterData = self.indexData;

      }).catch(error => console.error(error));

    },
    searchItems() {

      squery = document.getElementById('search-text').value;
      let searchData = self.indexData.filter(items => (items.description_en.toLowerCase().includes(squery.toLowerCase()) || items.description_pt.toLowerCase().includes(squery.toLowerCase()) ||items.description_es.toLowerCase().includes(squery.toLowerCase())));
      
      self.filterData = searchData;
    },
    ResetItems() {
      self.filterData = self.indexData;
      document.getElementById("filter-count").style.display = "none";
      document.getElementById("form-1").selectedIndex = 0;
      document.getElementById("form-2").selectedIndex = 0;
      document.getElementById("form-3").selectedIndex = 0;
      document.getElementById("form-4").selectedIndex = 0;
    },
    objLang(dd){
      return this[dd+'_'+this.langsel];
    },
    changeFilter(event) {
      
      document.getElementById("filter-count").style.display = "block";
      var element = document.body.querySelectorAll("select");
      console.log(element);
      this.selectedAudience = element[0].value;
      this.selectedType = element[1].value;
      this.selectedTopic = element[2].value;
      this.selectedTimeline = element[3].value;
      console.log(this.selectedTimeline);
      //Scope Filter
      if (this.selectedAudience == '')
        self.filtered_audience = self.indexData;
      else {
        console.log(self.indexData);
        let filtered_by_audience = self.indexData.filter(function (e) {
          console.log(e);
          return JSON.parse(e.audience).some(aud_element => aud_element == self.selectedAudience);
        });
        self.filtered_audience = filtered_by_audience;
      }
      //Region Filter
      if (this.selectedType == '')
        self.filtered_type = self.filtered_audience;
      else {
        let filtered_by_type = self.filtered_audience.filter(function (e) {
          return JSON.parse(e.area).some(reg_element => reg_element == self.selectedType);
        });
        self.filtered_type = filtered_by_type;
      }
      //Topic Area Filter
      if (this.selectedTopic == '')
        self.filtered_topic = self.filtered_type;
      else {
        let filtered_by_topic = self.filtered_type.filter(function (e) {
          return JSON.parse(e.topic).some(are_element => are_element == self.selectedTopic);
        });
        self.filtered_topic = filtered_by_topic;
      }
      //Pandemic Filter
      if (this.selectedTimeline == '')
        self.filtered_timeline = self.filtered_topic;
      else {
        let filtered_by_timeline = self.filtered_topic.filter(function (e) {
          return e.timeline == self.selectedTimeline;
        });
        self.filtered_timeline = filtered_by_timeline;
      }
      self.filterData = self.filtered_timeline;
    },
    // langid(tr){
    //   const trIndex = tr.translations.findIndex(a=>{  return a.status == 'published' && a.language == this.langsel  })
    //   return trIndex;
    // },

    
  }
});


// DOWNLOAD THE FINAL REPORT,EXPLORE THE RECOMMENDATIONS,EXPLORE THE STRATEGIES VIEW THE EXECUTIVE MEMOS,VIEW THE EXECUTIVE MEMOS,GUIDE TO ALL RESOURCES,ABOUT THE PROJECT,VIEW THE PLAYBOOK
