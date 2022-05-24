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
  
      ReccoData: [],
      showExample: false,
      showAction: false,
      index_active:0,
      langsel:'en',
      apiURL: 'https://directus.thegovlab.com/smarter-crowdsourcing',
      apiURLd9: 'https://d9.sc.thegovlab.com/',
    }
  },

  created: function created() {
    this.memberslug=window.location.href.split('/');
    this.memberslug = this.memberslug[this.memberslug.length - 1];
    
    this.memberslug = 'interjurisdictional-coordination'; // test
    this.fetchRecommendations();
  },
  methods: {

    fetchRecommendations() {
      self = this;
      axios.get(this.apiURLd9+"items/recommendation?fields=*,strategies.strategies_id.*,topic.topics_id.translations.*,strategies.strategies_id.actions.actions_id.*,strategies.strategies_id.examples.examples_id.*&filter[slug]="+self.memberslug).then(data => {
        console.log(data.data)
        
        self.ReccoData = data.data.data;

      }).catch(error => console.error(error));

//       const client = new DirectusSDK({
//         url: "https://directus.thegovlab.com/",
//         project: "smarter-crowdsourcing",
//         storage: window.localStorage
//       });

//       client.getItems(
//   'recommendation',
//   {
//     filter: {
//       slug: self.memberslug
//     },
  
//     fields: ['*.*','strategies.strategies_id.*','topic.topics_id.translations.*','strategies.strategies_id.actions.actions_id.*','strategies.strategies_id.examples.examples_id.*'],
//   }
// ).then(data => {
 
//   self.ReccoData = data.data;
// })
// .catch(error => console.error(error));
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
    }
}
});


