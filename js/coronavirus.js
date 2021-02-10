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
      indexData: [],
      productData: [],
      indexTextData: [],
      reportData:[],
      TeamData: [],
      ReccoData: [],
      apiURL: 'https://directus.thegovlab.com/smarter-crowdsourcing',
    }
  },

  created: function created() {
    this.fetchIndex();
    this.fetchProducts();
    this.fetchReports();
    this.fetchIndexText();
    this.fetchTeamData();
    this.fetchRecommendations();
  },
  methods: {

    fetchIndex() {
      self = this;
      const client = new DirectusSDK({
        url: "https://directus.thegovlab.com/",
        project: "smarter-crowdsourcing",
        storage: window.localStorage
      });

      client.getItems(
  'topics',
  {
    fields: ['*.*','translations.*','translations.memo_image.*','translations.executive_memo.*']
  }
).then(data => {
  console.log(data)
  self.indexData = data.data;
})
.catch(error => console.error(error));
    },
    fetchReports() {
      self = this;
      const client = new DirectusSDK({
        url: "https://directus.thegovlab.com/",
        project: "smarter-crowdsourcing",
        storage: window.localStorage
      });

      client.getItems(
  'reports',
  {
    fields: ['*.*']
  }
).then(data => {
  console.log(data)
  self.reportData = data.data;
})
.catch(error => console.error(error));
    },
    fetchProducts() {
      self = this;
      const client = new DirectusSDK({
        url: "https://directus.thegovlab.com/",
        project: "smarter-crowdsourcing",
        storage: window.localStorage
      });

      client.getItems(
  'products',
  {
    fields: ['*.*','translation.*']
  }
).then(data => {
  console.log(data)
  self.productData = data.data;
})
.catch(error => console.error(error));
    },
    fetchIndexText() {
      self = this;
      const client = new DirectusSDK({
        url: "https://directus.thegovlab.com/",
        project: "smarter-crowdsourcing",
        storage: window.localStorage
      });

      client.getItems(
  'homepage',
  {
    fields: ['*.*']
  }
).then(data => {
  console.log(data)
  self.indexTextData = data.data;
  
})
.catch(error => console.error(error));
    },
    fetchTeamData() {
      self = this;
      const client = new DirectusSDK({
        url: "https://directus.thegovlab.com/",
        project: "smarter-crowdsourcing",
        storage: window.localStorage
      });

      client.getItems(
  'team',
  {
    fields: ['*.*'],
  }
).then(data => {
  console.log(data)
  self.TeamData = data.data;
  
})
.catch(error => console.error(error));
    },
    fetchRecommendations() {
      self = this;
      const client = new DirectusSDK({
        url: "https://directus.thegovlab.com/",
        project: "smarter-crowdsourcing",
        storage: window.localStorage
      });

      client.getItems(
  'recommendation',
  {
    fields: ['*.*','strategies.strategies_id.*','topic.topics_id.translations.*','strategies.strategies_id.actions.actions_id.*','strategies.strategies_id.examples.examples_id.*'],
  }
).then(data => {
  console.log(data)
  self.ReccoData = data.data;
})
.catch(error => console.error(error));
    }
}
});


