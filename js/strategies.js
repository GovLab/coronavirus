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
  
      stratData: [],
      showExample: false,
      showAction: false,
      index_active:0,
      apiURL: 'https://directus.thegovlab.com/smarter-crowdsourcing',
    }
  },

  created: function created() {
    this.memberslug=window.location.href.split('/');
    this.memberslug = this.memberslug[this.memberslug.length - 1];
    console.log(this.memberslug);
    this.fetchStrategies();
  },
  methods: {

    fetchStrategies() {

      self = this;
      const client = new DirectusSDK({
        url: "https://directus.thegovlab.com/",
        project: "smarter-crowdsourcing",
        storage: window.localStorage
      });

      client.getItems(
        'strategies',
        {
          filter: {
            slug: self.memberslug
          },
          fields: ['*.*','strat_rec.recommendation_id.*','strat_topic.topics_id.translations.*','actions.actions_id.*','examples.examples_id.*']
        }
      ).then(data => {

        self.stratData = data.data;
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
    }
}
});


