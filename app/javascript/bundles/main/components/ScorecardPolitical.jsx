import React from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';
import Politician from './scorecard_political/Politician'

export default class ScorecardPolitical extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: '',
      good: 0,
      goodFiltered: [],
      neutral: 0,
      neutralFiltered: [],
      bad: 0,
      badFiltered: [],
      politicians: {
        good: [],
        neutral: [],
        bad: []
      },
      filtered: 'All',
      states: [
        'Alabama',
        'Alaska',
        'Arizona',
        'Arkansas',
        'California',
        'Colorado',
        'Connecticut',
        'Delaware',
        'Florida',
        'Georgia',
        'Hawaii',
        'Idaho',
        'Illinois',
        'Indiana',
        'Iowa',
        'Kansas',
        'Kentucky',
        'Louisiana',
        'Maine',
        'Maryland',
        'Massachusetts',
        'Michigan',
        'Minnesota',
        'Mississippi',
        'Missouri',
        'Montana',
        'Nebraska',
        'Nevada',
        'New Hampshire',
        'New Jersey',
        'New Mexico',
        'New York',
        'North Carolina',
        'North Dakota',
        'Ohio',
        'Oklahoma',
        'Oregon',
        'Pennsylvania',
        'Rhode Island',
        'South Carolina',
        'South Dakota',
        'Tennessee',
        'Texas',
        'Utah',
        'Vermont',
        'Virginia',
        'Washington',
        'West Virginia',
        'Wisconsin',
        'Wyoming'
      ]
    };

  }

  componentDidMount() {
    axios.get('https://spreadsheets.google.com/feeds/list/1rTzEY0sEEHvHjZebIogoKO1qfTez2T6xNj0AScO6t24/default/public/values?alt=json')
      .then(res => {
        var politicians = this.processPoliticians(res.data.feed.entry);
        this.setState({
          good: 5 < politicians.good.length ? 5 : politicians.good.length,
          neutral: 5 < politicians.neutral.length ? 5 : politicians.neutral.length,
          bad: 5 < politicians.bad.length ? 5 : politicians.bad.length,
          goodFiltered: politicians.good,
          neutralFiltered: politicians.neutral,
          badFiltered: politicians.bad,
          politicians: politicians
        });
        window.scrollTo(0, 0);
      })
      .catch((error) => console.log('unable to get spreadsheet', error));
  }

  expandArticle = () => {
    this.setState({expanded: 'expanded'});
  }

  processPoliticians = (entries) => {
    var politicians = { good: [], neutral: [], bad: [] };

    for (const entry of entries) {
      var politician = this.processPolitician(entry);
      if (politician.active != 'No') {
        if (politician.score > 5 ){
          politicians.good.push(politician);
        } else if (politician.score >= 0) {
          politicians.neutral.push(politician);
        } else if (politician.score < 0) {
          politicians.bad.push(politician);
        }
      }
    }

    return politicians;
  }

  processPolitician = (entry) => {
    const { states } = this.state;
    var e = (field) => { return entry['gsx$'+field]['$t'].trim(); };

    var politician = {
      first_name:      e('first'),
      last_name:       e('name'),
      image:           e('imagepleasedontedit'),
      bioguide:        e('bioguide'),
      email:           e('email'),
      phone:           e('phone'),
      organization:    e('organization'),
      state:           e('state'),
      state_short:     states[e('state')],
      twitter:         e('twitter'),
      party:           e('partyaffiliation'),
      vote_usaf:       e('voteusaf'),
      vote_tempreauth: e('votetempreauth'),
      office1:         e('office1'),
      office1phone:    e('office1phone'),
      office1geo:      e('office1geo'),
      office2:         e('office2'),
      office2phone:    e('office2phone'),
      office2geo:      e('office2geo'),
      office3:         e('office3'),
      office3phone:    e('office3phone'),
      office3geo:      e('office3geo'),
      office4:         e('office4'),
      office4phone:    e('office4phone'),
      office4geo:      e('office4geo'),
      office5:         e('office5'),
      office5phone:    e('office5phone'),
      office5geo:      e('office5geo'),
      office6:         e('office6'),
      office6phone:    e('office6phone'),
      office6geo:      e('office6geo'),
      office7:         e('office7'),
      office7phone:    e('office7phone'),
      office7geo:      e('office7geo'),
      office8:         e('office8'),
      office8phone:    e('office8phone'),
      office8geo:      e('office8geo'),
      active:          e('active'),

      // scorecard fields
      fisa_courts_reform_act:                                 e('fisacourtsreformact'),
      s_1551_iosra:                                           e('s1551iosra'),
      fisa_improvements_act:                                  e('fisaimprovementsact'),
      fisa_transparency_and_modernization_act:                e('fisatransparencyandmodernizationact'),
      surveillance_state_repeal_act:                          e('surveillancestaterepealact'),
      usa_freedom_prior_to_20140518:                          e('usafreedompriorto2014-05-18'),
      voted_for_conyers_amash_amendment:                      e('votedforconyersamashamendment'),
      voted_for_house_version_of_usa_freedom_act_2014:        e('votedforhouseversionofusafreedomact2014'),
      voted_for_massie_lofgren_amendment_2014:                e('votedformassielofgrenamendment2014'),
      whistleblower_protection_for_ic_employees_contractors:  e('whistleblowerprotectionforicemployeescontractors'),
      first_usaf_cloture_vote:                                e('stusafcloturevote'),
      straight_reauth:                                        e('straightreauth'),
      fisa_reform_act:                                        e('fisareformact'),
      amendment_1449_data_retention:                          e('amendment1449dataretention'),
      amendment_1450_extend_implementation_to_1yr:            e('amendment1450extendimplementationto1yr'),
      amendment_1451_gut_amicus:                              e('amendment1451gutamicus'),
      final_passage_usaf:                                     e('finalpassageusaf'),
      s_702_reforms:                                          e('reforms'),
      massie_lofgren_amendment_to_hr2685_defund_702:          e('massielofgrenamendmenttohr2685defund702'),
      massie_lofgren_amendment_to_hr4870_no_backdoors:        e('massielofgrenamendmenttohr4870nobackdoors'),
      ECPA_reform_cosponsor:                                  e('ecpareformcosponsor'),
      house_PCNA:                                             e('housepcna'),
      house_NCPA:                                             e('housencpaa'),
      ECPA_reform_cosponsor:                                  e('ecpareformcosponsor'),
      CISA_cloture_vote:                                      e('cisacloture'),
      franken_cisa_amendment:                                 e('frankencisaamendment'),
      wyden_cisa_amendment:                                   e('wydencisaamendment'),
      heller_cisa_amendment:                                  e('hellercisaamendment'),
      coons_cisa_amendment:                                   e('coonscisaamendment'),
      coons_cisa_amendment:                                   e('cottoncisaamendment'),
      cisa_final:                                             e('cisafinal')
    };

    var scoring = this.doScore(politician);
    politician.score = scoring.score;
    politician.score_criteria = scoring.score_criteria;
    politician.grade = scoring.grade;

    return politician;
  }

  doScore = (politician) => {
    var score = 0;
    var score_criteria = [];

    if (politician['fisa_courts_reform_act'] == 'X') {
        var inc = 3;
        score_criteria.push({
            score:  inc,
            info:   'Supported the FISA Courts Reform Act',
            url: 'http://www.ibtimes.com/nsa-fisa-surveillance-obama-likely-back-secret-court-reform-senator-says-1368781'
        });
        score += inc;
    }
    if (politician['s_1551_iosra'] == 'X') {
        var inc = 4;
        score_criteria.push({
            score:  inc,
            info:   'Supported the Intelligence Oversight and Surveillance Reform Act',
            url:   'https://cdt.org/blog/bills-offer-clear-choice-end-bulk-collection-of-americans%E2%80%99-data-or-endorse-it/'
        });
        score += inc;
    }
    if (politician['fisa_improvements_act'] == 'X') {
        var inc = -4;
        score_criteria.push({
            score:  inc,
            info:   'Supported the FISA Improvements Act',
            url:'http://www.theguardian.com/world/2013/nov/15/feinstein-bill-nsa-warrantless-searches-surveillance'
        });
        score += inc;
    }
    if (politician['fisa_transparency_and_modernization_act'] == 'X') {
        var inc = -4;
        score_criteria.push({
            score:  inc,
            info:   'Supported the FISA Transparency and Modernization Act',
            url:'https://www.eff.org/deeplinks/2014/04/nsa-reform-bill-intelligence-community-written-intelligence-community-and'
        });
        score += inc;
    }
    if (politician['surveillance_state_repeal_act'] == 'X') {
        var inc = 4;
        score_criteria.push({
            score:  inc,
            info:   'Supported the Surveillance State Repeal Act',
            url:'http://www.restorethe4th.com/blog/go-big-or-go-home-pass-the-new-surveillance-state-repeal-act/'
        });
        score += inc;
    }
    if (politician['usa_freedom_prior_to_20140518'] == 'X') {
        var inc = 2;
        score_criteria.push({
            score:  inc,
            info:   'Supported the original USA Freedom Act (prior to May 18th, 2014)',
            url:' https://www.eff.org/deeplinks/2014/07/new-senate-usa-freedom-act-first-step-towards-reforming-mass-surveillance'
        });
        score += inc;
    }
    if (politician['voted_for_conyers_amash_amendment'] == 'X') {
        var inc = 4;
        score_criteria.push({
            score:  inc,
            info:   'Voted for Conyers Amash Amendment',
            url: ' http://americablog.com/2013/07/amash-conyers-anti-nsa-amendment-lost-by-12-votes-205-217.html'
        });
        score += inc;
    }
    if (politician['voted_for_house_version_of_usa_freedom_act_2014'] == 'X') {
        var inc = -2;
        score_criteria.push({
            score:  inc,
            info:   'Voted for gutted House version of USA Freedom Act of 2014',
            url: 'https://www.eff.org/deeplinks/2014/05/eff-dismayed-houses-gutted-usa-freedom-act'
        });
        score += inc;
    }
    if (politician['voted_for_massie_lofgren_amendment_2014'] == 'X') {
        var inc = 3;
        score_criteria.push({
            score:  inc,
            info:   'Voted for Massie-Lofgren Amendment (2014)',
            url:' http://www.huffingtonpost.com/2014/12/10/nsa-surveillance-spending-bill_n_6304834.html'
        });
        score += inc;
    }
    if (politician['whistleblower_protection_for_ic_employees_contractors'] == 'X') {
        var inc = 4;
        score_criteria.push({
            score:  inc,
            info:   'Supported whistleblower protection measures for Intelligence employees and contractors',
            url:'http://whistleblower.org/blog/121230-49-orgs-call-congress-restore-whistleblower-rights-intelligence-contractors'
        });
        score += inc;
    }
    if (politician['first_usaf_cloture_vote'] == 'GOOD') {
        var inc = 4;
        score_criteria.push({
            score:  inc,
            info:   'Voted NO on reauthorizing the PATRIOT Act *and* NO on cloture for the first Senate USA Freedom Act',
            url:'http://www.thewhir.com/web-hosting-news/senate-votes-to-invoke-cloture-on-usa-freedom-act-advancing-it-to-an-amendment-process'

        });
        score += inc;
    }
    else if (politician['first_usaf_cloture_vote'] == 'OK') {
        var inc = -1;
        score_criteria.push({
            score:  inc,
            info:   'Voted NO on reauthorizing the PATRIOT Act *and* YES on cloture for the first Senate USA Freedom Act',
            url:'http://www.thewhir.com/web-hosting-news/senate-votes-to-invoke-cloture-on-usa-freedom-act-advancing-it-to-an-amendment-process'
        });
        score += inc;
    }
    else if (politician['first_usaf_cloture_vote'] == 'BAD') {
        var inc = -4;
        score_criteria.push({
            score:  inc,
            info:   'Voted YES on reauthorizing the PATRIOT Act and NO on the first USA Freedom Act cloture vote',
            url:'http://thehill.com/policy/national-security/242173-mcconnell-introduces-short-term-nsa-bill'
        });
        score += inc;
    }
    if (politician['straight_reauth'] == 'GOOD') {
        var inc = 3;
        score_criteria.push({
            score:  inc,
            info:   'Voted NO on reauthorizing the PATRIOT Act',
            url:'http://thehill.com/policy/national-security/242173-mcconnell-introduces-short-term-nsa-bill'
        });
        score += inc;
    }
    else if (politician['straight_reauth'] == 'BAD') {
        var inc = -3;
        score_criteria.push({
            score:  inc,
            info:   'Voted YES on reauthorizing the PATRIOT Act',
            url:'https://cdt.org/insight/oppose-senator-feinsteins-fisa-reform-act-of-2015/'
        });
        score += inc;
    }
    if (politician['fisa_reform_act'] == 'X') {
        var inc = -3;
        score_criteria.push({
            score:  inc,
            info:   'Supported the FISA Reform Act',
            url:'https://www.eff.org/deeplinks/2015/06/eff-opposes-amendments-weakening-usa-freedom-act'
        });
        score += inc;
    }
    if (politician['amendment_1449_data_retention'] == 'GOOD') {
        var inc = 1;
        score_criteria.push({
            score:  inc,
            info:   'Voted NO on USA Freedom data retention amendment (1449)',
            url: 'https://www.eff.org/deeplinks/2015/06/eff-opposes-amendments-weakening-usa-freedom-act'
        });
        score += inc;
    }
    else if (politician['amendment_1449_data_retention'] == 'BAD') {
        var inc = -3;
        score_criteria.push({
            score:  inc,
            info:   'Voted YES on USA Freedom data retention amendment (1449)',
            url: 'https://www.eff.org/deeplinks/2015/06/eff-opposes-amendments-weakening-usa-freedom-act'
        });
        score += inc;
    }
    if (politician['amendment_1450_extend_implementation_to_1yr'] == 'GOOD') {
        var inc = 1;
        score_criteria.push({
            score:  inc,
            info:   'Voted NO on amendment 1450 extending implementation of USA Freedom Act by 1 year',
            url:'https://www.eff.org/deeplinks/2015/06/eff-opposes-amendments-weakening-usa-freedom-act'
        });
        score += inc;
    }
    else if (politician['amendment_1450_extend_implementation_to_1yr'] == 'BAD') {
        var inc = -2;
        score_criteria.push({
            score:  inc,
            info:   'Voted YES on amendment 1450 extending implementation of USA Freedom Act by 1 year',
            url:'https://www.eff.org/deeplinks/2015/06/eff-opposes-amendments-weakening-usa-freedom-act'
        });
        score += inc;
    }
    if (politician['amendment_1451_gut_amicus'] == 'GOOD') {
        var inc = 1;
        score_criteria.push({
            score:  inc,
            info:   'Voted NO on amendment 1451 to gut amicus proceedings',
            url: 'https://www.eff.org/deeplinks/2015/06/eff-opposes-amendments-weakening-usa-freedom-act'
        });
        score += inc;
    }
    else if (politician['amendment_1451_gut_amicus'] == 'BAD') {
        var inc = -3;
        score_criteria.push({
            score:  inc,
            info:   'Voted YES on amendment 1451 to gut amicus proceedings',
            url: 'https://www.eff.org/deeplinks/2015/06/eff-opposes-amendments-weakening-usa-freedom-act'
        });
        score += inc;
    }
    if (politician['final_passage_usaf'] == 'GOOD') {
        var inc = 4;
        score_criteria.push({
            score:  inc,
            info:   'Voted NO on USA Freedom Act (final passage)',
            url:"http://www.restorethe4th.com/blog/most-reps-voting-for-usa-freedom-were-opponents-of-surveillance-reform/"
        });
        score += inc;
    }
    else if (politician['final_passage_usaf'] == 'OK') {
        var inc = -1;
        score_criteria.push({
            score:  inc,
            info:   'Voted YES on reforming bulk collection via USAF',
            url:'https://www.eff.org/deeplinks/2015/05/usa-freedom-act-passes-what-we-celebrate-what-we-mourn-and-where-we-go-here'
        });
        score += inc;
    }
    else if (politician['final_passage_usaf'] == 'BAD') {
        var inc = -4;
        score_criteria.push({
            score:  inc,
            info:   'Voted NO on USA Freedom Act (final passage) and YES on extending the PATRIOT Act',
            url:"http://www.restorethe4th.com/blog/most-reps-voting-for-usa-freedom-were-opponents-of-surveillance-reform/"
        });
        score += inc;
    }
    if (politician['s_702_reforms'] == 'X') {
        var inc = 4;
        score_criteria.push({
            score:  inc,
            info:   'Supported bills reforming Section 702 of FISA',
            url:undefined
        });
        score += inc;
    }
    if (politician['massie_lofgren_amendment_to_hr2685_defund_702'] == 'GOOD') {
        var inc = 3;
        score_criteria.push({
            score:  inc,
            info:   'Voted YES on Massie-Lofgren Amendment to HR2685: Defund Section 702 surveillance',
            url:'https://demandprogress.org/letter-of-support-for-massie-lofgren-amendment-to-the-department-of-defense-appropriations-act-of-2016-h-r-2685/'
        });
        score += inc;
    }
    else if (politician['massie_lofgren_amendment_to_hr2685_defund_702'] == 'BAD') {
        var inc = -3;
        score_criteria.push({
            score:  inc,
            info:   'Voted NO on Massie-Lofgren Amendment to HR2685: Defund Section 702 surveillance',
            url:'https://demandprogress.org/letter-of-support-for-massie-lofgren-amendment-to-the-department-of-defense-appropriations-act-of-2016-h-r-2685/'
        });
        score += inc;
    }
    if (politician['massie_lofgren_amendment_to_hr4870_no_backdoors'] == 'GOOD') {
        var inc = 3;
        score_criteria.push({
            score:  inc,
            info:   'Voted YES on Massie-Lofgren Amendment to HR4870: Ban encryption backdoors',
            url: 'https://shutthebackdoor.net/'
        });
        score += inc;
    }
    else if (politician['massie_lofgren_amendment_to_hr4870_no_backdoors'] == 'BAD') {
        var inc = -3;
        score_criteria.push({
            score:  inc,
            info:   'Voted NO on Massie-Lofgren Amendment to HR4870: Ban encryption backdoors',
            url: 'https://shutthebackdoor.net/'
        });
        score += inc;
    }
    if (politician['ECPA_reform_cosponsor'] == 'GOOD') {
        var inc = 2;
        score_criteria.push({
            score:  inc,
            info:   'Co-Sponsor of Electronic Commmunication Privacy Act Reform',
            url: 'https://www.eff.org/deeplinks/2015/09/senate-judiciary-committee-finally-focuses-ecpa-reform'
        });
        score += inc;
    }
    if (politician['CISA_cloture_vote'] == 'BAD') {
        var inc = -4;
        score_criteria.push({
            score:  inc,
            info:   'Voted for CISA Cloture Vote',
            url: 'http://www.slate.com/articles/technology/future_tense/2015/10/stopcisa_the_cybersecurity_information_sharing_act_is_a_disaster.html'
        });
        score += inc;
    }
    else if (politician['CISA_cloture_vote'] == 'GOOD') {
        var inc = 4;

        score_criteria.push({
            score: inc,
            info:   'Voted against CISA Cloture Vote',
            url: 'http://www.slate.com/articles/technology/future_tense/2015/10/stopcisa_the_cybersecurity_information_sharing_act_is_a_disasteecpareformcosponsorr.html'
        });
        score += inc;
    }
    if (politician['house_NCPA'] == 'BAD') {
        var inc = -2;
        score_criteria.push({
            score:  inc,
            info:   'Voted for National Cybersecurity Protection Advancement Act',
            url: 'http://techcrunch.com/2015/04/23/house-passes-complementary-cyber-information-sharing-bill/'
        });
        score += inc;
    }
    else if (politician['house_NCPA'] == 'GOOD') {
        var inc = 2;

        score_criteria.push({
            score: inc,
            info:   'Voted against National Cybersecurity Protection Advancement Act',
            url: 'http://techcrunch.com/2015/04/23/house-passes-complementary-cyber-information-sharing-bill/'
        });
        score += inc;
    }
    if (politician['house_PCNA'] == 'BAD') {
        var inc = -3;
        score_criteria.push({
            score:  inc,
            info:   'Voted for The Protecting Cyber Networks Act ',
            url: 'https://www.eff.org/deeplinks/2015/04/eff-congress-stop-cybersurveillance-bills'
        });
        score += inc;
    }
    else if (politician['house_PCNA'] == 'GOOD') {
        var inc = 3;

        score_criteria.push({
            score: inc,
            info:   'Voted against The Protecting Cyber Networks Act ',
            url: 'https://www.eff.org/deeplinks/2015/04/eff-congress-stop-cybersurveillance-bills'
        });
        score += inc;
    }
    if (politician['franken_cisa_amendment'] == 'BAD') {
        var inc = -1;
        score_criteria.push({
            score:  inc,
            info:   'Voted against the Franken CISA amendment',
            url: 'http://www.newsweek.com/senate-passes-controversial-cisa-bill-companies-share-cyber-security-387785'
        });
        score += inc;
    }
    else if (politician['franken_cisa_amendment'] == 'GOOD') {
        var inc = 2;

        score_criteria.push({
            score: inc,
            info:   'Voted for the Franken CISA amendment ',
            url: 'http://www.newsweek.com/senate-passes-controversial-cisa-bill-companies-share-cyber-security-387785'
        });
        score += inc;
    }
    if (politician['wyden_cisa_amendment'] == 'BAD') {
        var inc = -1;
        score_criteria.push({
            score:  inc,
            info:   'Voted against the Wyden CISA amendment',
            url: 'http://www.freedomworks.org/content/key-vote-yes-wyden-amendment-strengthen-privacy-protections-cisa'
        });
        score += inc;
    }
    else if (politician['wyden_cisa_amendment'] == 'GOOD') {
        var inc = 2;

        score_criteria.push({
            score: inc,
            info:   'Voted for the Wyden CISA amendment ',
            url: 'http://www.freedomworks.org/content/key-vote-yes-wyden-amendment-strengthen-privacy-protections-cisa'
        });
        score += inc;
    }
    if (politician['heller_cisa_amendment'] == 'BAD') {
        var inc = -1;
        score_criteria.push({
            score:  inc,
            info:   'Voted against the Heller CISA amendment',
            url: 'https://cdt.org/blog/guide-to-cybersecurity-information-sharing-act-amendments/'
        });
        score += inc;
    }
    else if (politician['heller_cisa_amendment'] == 'GOOD') {
        var inc = 1;

        score_criteria.push({
            score: inc,
            info:   'Voted for the Heller CISA amendment ',
            url: 'https://cdt.org/blog/guide-to-cybersecurity-information-sharing-act-amendments/'
        });
        score += inc;
    }
    if (politician['coons_cisa_amendment'] == 'BAD') {
        var inc = -1;
        score_criteria.push({
            score:  inc,
            info:   'Voted against the Coons CISA amendment',
            url: 'https://cdt.org/blog/guide-to-cybersecurity-information-sharing-act-amendments/'
        });
        score += inc;
    }
    else if (politician['coons_cisa_amendment'] == 'GOOD') {
        var inc = 1;

        score_criteria.push({
            score: inc,
            info:   'Voted for the Coons CISA amendment ',
            url: 'https://cdt.org/blog/guide-to-cybersecurity-information-sharing-act-amendments/'
        });
        score += inc;
    }
    if (politician['cotton_cisa_amendment'] == 'BAD') {
        var inc = -2;
        score_criteria.push({
            score:  inc,
            info:   'Voted for the Cotton CISA amendment',
            url: 'https://cdt.org/blog/guide-to-cybersecurity-information-sharing-act-amendments/'
        });
        score += inc;
    }
    else if (politician['cotton_cisa_amendment'] == 'GOOD') {
        var inc = 1;

        score_criteria.push({
            score: inc,
            info:   'Voted against the Cotton CISA amendment ',
            url: 'https://cdt.org/blog/guide-to-cybersecurity-information-sharing-act-amendments/'
        });
        score += inc;
    }
    if (politician['cisa_final'] == 'BAD') {
        var inc = -4;
        score_criteria.push({
            score:  inc,
            info:   'Voted for CISA in the final vote',
            url: 'http://www.vox.com/platform/amp/2015/10/21/9587190/cisa-senate-privacy-nsa'
        });
        score += inc;
    }
    else if (politician['cisa_final'] == 'GOOD') {
        var inc = 4;

        score_criteria.push({
            score: inc,
            info:   'Voted against CISA in the final vote ',
            url: 'http://www.vox.com/platform/amp/2015/10/21/9587190/cisa-senate-privacy-nsa'
        });
        score += inc;
    }

    if(score >= 15){
        var grade="A+"
    }
    else if(score >= 12){
        var grade="A"
    }
    else if(score >= 10){
        var grade="A-"
    }
    else if(score >= 9){
        var grade="B+"
    }
    else if(score >= 8){
        var grade="B"
    }
    else if(score >= 7){
        var grade="B-"
    }
    else if(score >= 6){
        var grade="B-"
    }
    else if(score >= 5){
        var grade="C+"
    }
    else if(score >= 3){
        var grade="C"
    }
    else if(score >= 0){
        var grade="C-"
    }
    else if(score >= -2){
        var grade="D+"
    }
    else if(score >= -7){
        var grade="D"
    }
    else if(score >= -9){
        var grade="D-"
    }
    else if (politician['last_name'] == 'McConnell') {
        var grade="F-"
    }
    else{
        var grade="F"
    }

    return (
      {
        score: score,
        grade: grade,
        score_criteria: score_criteria
      }
    );
  }

  loadGood = () => {
    const { goodFiltered, good } = this.state;
    const max = goodFiltered.length;
    console.log('loading more good...', good, max);
    this.setState({ good: good + 5 < max ? good + 5 : max });
  }

  loadNeutral = () => {
    const { neutralFiltered, neutral } = this.state;
    const max = neutralFiltered.length;

    console.log('loading more neutral...', max);
    this.setState({ neutral: neutral + 5 < max ? neutral + 5 : max });
  }

  loadBad = () => {
    const { badFiltered, bad } = this.state;
    const max = badFiltered.length;
    console.log('loading more bad...', bad, max);
    this.setState({ bad: bad + 5 < max ? bad + 5 : max });
  }

  filterPoliticians = (e) => {
    const { politicians } = this.state;
    const selection = e.target.value
    var goodFiltered, neutralFiltered, badFiltered;

    if (e.target.value == 'All') {
      goodFiltered = politicians.good;
      neutralFiltered = politicians.neutral;
      badFiltered = politicians.bad;
    } else if (selection == 'House' || selection == 'Senate') {
      goodFiltered = politicians.good.filter(politician => (
        politician.organization == selection
      ));
      neutralFiltered = politicians.neutral.filter(politician => (
        politician.organization == selection
      ));
      badFiltered = politicians.bad.filter(politician => (
        politician.organization == selection
      ));
    } else {
      goodFiltered = politicians.good.filter(politician => (
        politician.state == selection
      ));
      neutralFiltered = politicians.neutral.filter(politician => (
        politician.state == selection
      ));
      badFiltered = politicians.bad.filter(politician => (
        politician.state == selection
      ));
    }
    this.setState({
      filtered: selection,
      good: 5 < goodFiltered.length ? 5 : goodFiltered.length,
      neutral: 5 < neutralFiltered.length ? 5 : neutralFiltered.length,
      bad: 5 < badFiltered.length ? 5 : badFiltered.length,
      goodFiltered: goodFiltered,
      neutralFiltered: neutralFiltered,
      badFiltered: badFiltered
    });
  }

  filterPoliticiansByName = (e) => {
    const { politicians } = this.state;
    const name = e.target.value.toLowerCase();
    var goodFiltered = politicians.good.filter(politician => (
      politician.first_name.toLowerCase().includes(name) || politician.last_name.toLowerCase().includes(name)
    ));
    var neutralFiltered = politicians.neutral.filter(politician => (
      politician.first_name.toLowerCase().includes(name) || politician.last_name.toLowerCase().includes(name)
    ));
    var badFiltered = politicians.bad.filter(politician => (
      politician.first_name.toLowerCase().includes(name) || politician.last_name.toLowerCase().includes(name)
    ));
    this.setState({
      filtered: name,
      good: 5 < goodFiltered.length ? 5 : goodFiltered.length,
      neutral: 5 < neutralFiltered.length ? 5 : neutralFiltered.length,
      bad: 5 < badFiltered.length ? 5 : badFiltered.length,
      goodFiltered: goodFiltered,
      neutralFiltered: neutralFiltered,
      badFiltered: badFiltered
    });
  }

  render() {
    const {
      expanded,
      good,
      neutral,
      bad,
      states,
      filtered,
      goodFiltered,
      neutralFiltered,
      badFiltered
    } = this.state;

    return (
      <div className="scoreboard">
        <h2>Political Scoreboard</h2>
        <div id="candidates"></div>
        <p>
          We can protect the Internet, but to do that,
          we need to know who is helping us and who is working against us. &nbsp;
          <a href="#our-scoring-system">Learn about our scoring system. </a>
        </p>
        <div id="scoreboard_data">
          <label>Choose View:</label>
          <select onChange={this.filterPoliticians}>
            <optgroup label="View by Chamber">
              <option value="All">All Congress</option>
              <option value="Senate">Senate</option>
              <option value="House">House</option>
            </optgroup>
            <optgroup label="View by state">
              { states.map(value => (
                <option key={value} value={value}>{value}</option>
              ))}
            </optgroup>
          </select>
          <div style={{marginTop: '15px'}}>
            <label>Search by Name:{' '}</label>
            <input
              type='text'
              size='13'
              onChange={this.filterPoliticiansByName}
              placeholder='First/Last Name'
            />
          </div>
          <div className='politicians'>
            { good > 0 || bad > 0 ? (
              <div className="team internet">
                <h3>Team Internet</h3>
                <em>These politicians are standing up for the free Internet and oppose mass surveillance.</em>
                <div key={`good-${filtered}`} className={goodFiltered.length < 4 ? '' : 'politicians-scroll'}>
                  <InfiniteScroll
                    pageStart={0}
                    loadMore={this.loadGood}
                    hasMore={good < goodFiltered.length}
                    loader={<div className="loader" key={0}>Loading ...</div>}
                    useWindow={false}
                    initialLoad={false}
                    className="filtered"
                  >
                    {goodFiltered.slice(0, good).map((politician, i) => (
                      <Politician key={i} politician={politician} team='good' />
                    ))}
                  </InfiniteScroll>
                </div>
              </div>
            ) : '' }
            { good > 0 || bad > 0 ? (
              <div className="team surveillance">
                <h3>Team NSA</h3>
                <em>These politicians are working with monopolies to control the Internet for power and profit.</em>
                <div key={`bad-${filtered}`} className={badFiltered.length < 4 ? '' : 'politicians-scroll'}>
                  <InfiniteScroll
                    pageStart={0}
                    loadMore={this.loadBad}
                    hasMore={bad < badFiltered.length}
                    loader={<div className="loader" key={0}>Loading ...</div>}
                    useWindow={false}
                    initialLoad={false}
                    className="filtered"
                  >
                    {badFiltered.slice(0, bad).map((politician, i) => (
                      <Politician key={i} politician={politician} team='bad' />
                    ))}
                  </InfiniteScroll>
                </div>
              </div>
            ) : '' }
          </div>
          { neutral > 0 ? (
            <div className="team unknown">
              <h3>Unclear</h3>
              <div key={`neutral-${filtered}`} className={neutralFiltered.length < 4 ? '' : 'politicians-scroll'}>
                <InfiniteScroll
                  pageStart={0}
                  loadMore={this.loadNeutral}
                  hasMore={neutral < neutralFiltered.length}
                  loader={<div className="loader" key={0}>Loading ...</div>}
                  useWindow={false}
                  initialLoad={false}
                  className="filtered"
                >
                  {neutralFiltered.slice(0, neutral).map((politician, i) => (
                    <Politician key={i} politician={politician} team='neutral' />
                  ))}
                </InfiniteScroll>
              </div>
            </div>
          ) : '' }
        </div>
      </div>
    );
  }
}
