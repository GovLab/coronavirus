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
      langsel:'en',
      apiURLd9: 'https://d9.sc.thegovlab.com/',
      apiURL: 'https://directus.thegovlab.com/smarter-crowdsourcing',
    }
  },

  created: function created() {
    this.memberslug=window.location.href.split('/');
    this.memberslug = this.memberslug[this.memberslug.length - 1];    
    // this.memberslug = "Promote-and-use-open-source-and-simple-tools-for-d";
    
    console.log(this.memberslug);

    this.fetchStrategies();
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
    langid(tr){
      const trIndex = tr.translations.findIndex(a=>{  return a.status == 'published' && a.language == this.langsel  })
      return trIndex;
    },
}
});


