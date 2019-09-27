import React from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';
import Politician from './scorecard_political/Politician';

export default class ScorecardPolitical extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
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
      filtered: props.filtered || 'All',
      name: props.name || '',
      membership: props.membership || 'All',
      party: props.party || 'All',
      candidacy: props.candidacy || 'All',
      committees: {
        intelligence: 'Intelligence',
        judiciary: 'Judiciary',
        homelandsecurity: 'Homeland Security',
        armedservices: 'Armed Services'
      },
      caucuses: {
        freedom: 'Freedom Caucus',
        congressionalblack: 'Congressional Black Caucus',
        congressionalprogressive: 'Congressional Progressive Caucus',
        fourthamendment: 'Fourth Amendment Caucus'
      },
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
        const { politicians, filtered } = this.processPoliticians(res.data.feed.entry);
        this.setState({
          good: 16 < filtered.good.length ? 16 : filtered.good.length,
          bad: 16 < filtered.bad.length ? 16 : filtered.bad.length,
          neutral: 19 < filtered.neutral.length ? 19 : filtered.neutral.length,
          goodFiltered: filtered.good,
          badFiltered: filtered.bad,
          neutralFiltered: filtered.neutral,
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
    var filtered = { good: [], neutral: [], bad: [] };

    for (const entry of entries) {
      var politician = this.processPolitician(entry);
      if (politician.active != 'No' && politician.voting != 'Yes') {
        if (politician.score > 5 ){
          politicians.good.push(politician);
          if (this.matchPolitician(politician)) filtered.good.push(politician)
        } else if (politician.score >= 0) {
          politicians.neutral.push(politician);
          if (this.matchPolitician(politician)) filtered.neutral.push(politician)
        } else if (politician.score < 0) {
          politicians.bad.push(politician);
          if (this.matchPolitician(politician)) filtered.bad.push(politician)
        }
      }
    }

    return { politicians: politicians, filtered: filtered };
  }

  processPolitician = (entry) => {
    const { states } = this.state;
    var e = (field) => { return entry['gsx$'+field]['$t'].trim(); };

    var politician = {
      first_name:               e('first'),
      last_name:                e('name'),
      image:                    e('imagepleasedontedit'),
      bioguide:                 e('bioguide'),
      email:                    e('email'),
      phone:                    e('phone'),
      organization:             e('organization'),
      state:                    e('state'),
      state_short:              states[e('state')],
      twitter:                  e('twitter'),
      party:                    e('partyaffiliation'),
      vote_usaf:                e('voteusaf'),
      vote_tempreauth:          e('votetempreauth'),
      office1:                  e('office1'),
      office1phone:             e('office1phone'),
      office1geo:               e('office1geo'),
      office2:                  e('office2'),
      office2phone:             e('office2phone'),
      office2geo:               e('office2geo'),
      office3:                  e('office3'),
      office3phone:             e('office3phone'),
      office3geo:               e('office3geo'),
      office4:                  e('office4'),
      office4phone:             e('office4phone'),
      office4geo:               e('office4geo'),
      office5:                  e('office5'),
      office5phone:             e('office5phone'),
      office5geo:               e('office5geo'),
      office6:                  e('office6'),
      office6phone:             e('office6phone'),
      office6geo:               e('office6geo'),
      office7:                  e('office7'),
      office7phone:             e('office7phone'),
      office7geo:               e('office7geo'),
      office8:                  e('office8'),
      office8phone:             e('office8phone'),
      office8geo:               e('office8geo'),
      active:                   e('active'),
      voting:                   e('voting'),
      intelligence:             e('intelligence'),
      judiciary:                e('judiciary'),
      homelandsecurity:         e('homelandsecurity'),
      armedservices:            e('armedservices'),
      freedom:                  e('freedom'),
      congressionalblack:       e('congressionalblack'),
      congressionalprogressive: e('congressionalprogressive'),
      fourthamendment:          e('fourthamendment'),

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
      cisa_final:                                             e('cisafinal'),
      s_139:                                                  e('s139'),
      h_r_2740:                                               e('hr2740'),
      fbi_search:                                             e('fbisearch'),
      query_warrant:                                          e('querywarrant'),
      fara:                                                   e('fara'),
      candidacy:                                              e('candidacy'),
      facial:                                                 e('facial'),
      biometric:                                              e('biometric')
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
            info:   'Co-Sponsor of Electronic Communication Privacy Act Reform',
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
    if (politician['s_139'] == 'Yes') {
      if (politician.organization === 'House') {
        var inc = 4;
        var url = 'http://clerk.house.gov/evs/2018/roll014.xml';
        var info = 'Voted for the USA RIGHTS Act to rein in mass surveillance under Section 702 of the FISA Amendments Act';
      } else {
        var inc = -4;
        var url = 'https://www.senate.gov/legislative/LIS/roll_call_lists/roll_call_vote_cfm.cfm?congress=115&session=2&vote=00012';
        var info = 'Voted for cloture on bill extending Section 702 mass surveillance powers'
      }
      score_criteria.push({
        score: inc,
        info: info,
        url: url
      });
      score += inc;
    }
    else if (politician['s_139'] == 'No') {
      if (politician.organization === 'House') {
        var inc = -4;
        var url = 'http://clerk.house.gov/evs/2018/roll014.xml';
        var info = 'Voted against the USA RIGHTS Act to rein in mass surveillance under Section 702 of the FISA Amendments Act';
      } else {
        var inc = 4;
        var url = 'https://www.senate.gov/legislative/LIS/roll_call_lists/roll_call_vote_cfm.cfm?congress=115&session=2&vote=00012';
        var info = 'Voted against cloture on bill extending Section 702 mass surveillance powers'
      }
      score_criteria.push({
        score: inc,
        info: info,
        url: url
      });
      score += inc;
    }
    if (politician['fbi_search'] == 'Yes') {
      var inc = 2;
      score_criteria.push({
        score:  inc,
        info:   'Voted in Judiciary Committee for the USA Liberty Act amendment to close the FBI backdoor search loophole',
        url: 'https://docs.house.gov/meetings/JU/JU00/20171108/106622/CRPT-115-JU00-Vote001-20171108.pdf'
      });
      score += inc;
    }
    else if (politician['fbi_search'] == 'No') {
      var inc = -2;

      score_criteria.push({
        score: inc,
        info:   'Voted in Judiciary Committee against the USA Liberty Act amendment to close the FBI backdoor search loophole',
        url: 'https://docs.house.gov/meetings/JU/JU00/20171108/106622/CRPT-115-JU00-Vote001-20171108.pdf'
      });
      score += inc;
    }
    if (politician['query_warrant'] == 'Yes') {
      var inc = 2;
      score_criteria.push({
        score:  inc,
        info:   'Voted in Intelligence Committee for the FARA amendment to require warrant before querying Section 702 data',
        url: 'https://congress.gov/congressional-report/115th-congress/senate-report/182/1?q=%7B%22search%22%3A%5B%22billOriginalCosponsor%3AW000437%22%2C%22billOriginalCosponsor%3AW000437%22%5D%7D'
      });
      score += inc;
    }
    else if (politician['query_warrant'] == 'No') {
      var inc = -2;

      score_criteria.push({
        score: inc,
        info:   'Voted in Intelligence Committee against the FARA amendment to require warrant before querying Section 702 data',
        url: 'https://congress.gov/congressional-report/115th-congress/senate-report/182/1?q=%7B%22search%22%3A%5B%22billOriginalCosponsor%3AW000437%22%2C%22billOriginalCosponsor%3AW000437%22%5D%7D'
      });
      score += inc;
    }
    if (politician['fara'] == 'Yes') {
      var inc = -2;
      score_criteria.push({
        score:  inc,
        info:   'Voted in Intelligence Committee to report FARA to floor',
        url: 'https://congress.gov/congressional-report/115th-congress/senate-report/182/1?q=%7B%22search%22%3A%5B%22billOriginalCosponsor%3AW000437%22%2C%22billOriginalCosponsor%3AW000437%22%5D%7D'
      });
      score += inc;
    }
    else if (politician['fara'] == 'No') {
      var inc = 2;

      score_criteria.push({
        score: inc,
        info:   'Voted in Intelligence Committee to not report FARA to floor',
        url: 'https://congress.gov/congressional-report/115th-congress/senate-report/182/1?q=%7B%22search%22%3A%5B%22billOriginalCosponsor%3AW000437%22%2C%22billOriginalCosponsor%3AW000437%22%5D%7D'
      });
      score += inc;
    }
    if (politician['h_r_2740'] == 'Aye') {
      var inc = 4;
      score_criteria.push({
        score:  inc,
        info:   'Voted to add prohibitions on NSA reverse targeting to 2018 appropriations',
        url: 'http://legislink.org/us/house-vote-2018-14-2019-345'
      });
      score += inc;
    }
    else if (politician['h_r_2740'] == 'No') {
      var inc = -4;

      score_criteria.push({
        score: inc,
        info:   'Voted not to add prohibitions on NSA reverse targeting to 2018 appropriations',
        url: 'http://legislink.org/us/house-vote-2018-14-2019-345'
      });
      score += inc;
    }
    if (politician['facial'] == 'Yes') {
      var inc = 3;
      score_criteria.push({
        score:  inc,
        info:   'Sponsored bill to prohibit use of facial recognition technology to identify or track an end user without consent',
        url: 'https://www.govtrack.us/congress/bills/116/s847'
      });
      score += inc;
    }
    if (politician['biometric'] == 'Yes') {
      var inc = 4;
      score_criteria.push({
        score:  inc,
        info:   'Sponsored legislation to prohibit biometric recognition in most public and assisted housing',
        url: 'http://dearcolleague.us/2019/07/cosponsor-the-no-biometric-barriers-to-housing-act-of-2019-2/'
      });
      score += inc;
    }


    if (score_criteria.length == 0) {
      var grade = '?';
    } else if(score >= 15){
      var grade="A+";
    }
    else if(score >= 12){
      var grade="A";
    }
    else if(score >= 10){
      var grade="A-";
    }
    else if(score >= 9){
      var grade="B+";
    }
    else if(score >= 8){
      var grade="B";
    }
    else if(score >= 7){
      var grade="B-";
    }
    else if(score >= 6){
      var grade="B-";
    }
    else if(score >= 5){
      var grade="C+";
    }
    else if(score >= 3){
      var grade="C";
    }
    else if(score >= 0){
      var grade="C-";
    }
    else if(score >= -2){
      var grade="D+";
    }
    else if(score >= -7){
      var grade="D";
    }
    else if(score >= -9){
      var grade="D-";
    }
    else if (politician['last_name'] == 'McConnell') {
      var grade="F-";
    }
    else{
      var grade="F";
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
    this.setState({ good: good + 10 < max ? good + 10 : max });
  }

  loadBad = () => {
    const { badFiltered, bad } = this.state;
    const max = badFiltered.length;
    this.setState({ bad: bad + 10 < max ? bad + 10 : max });
  }

  loadNeutral = () => {
    const { neutralFiltered, neutral } = this.state;
    const max = neutralFiltered.length;

    this.setState({ neutral: neutral + 12 < max ? neutral + 12 : max });
  }

  filterPoliticians = (value, field) => {
    const { politicians } = this.state;
    var goodFiltered, neutralFiltered, badFiltered;

    goodFiltered = politicians.good.filter(politician => (
      this.matchPolitician(politician, value, field)
    ));
    neutralFiltered = politicians.neutral.filter(politician => (
      this.matchPolitician(politician, value, field)
    ));
    badFiltered = politicians.bad.filter(politician => (
      this.matchPolitician(politician, value, field)
    ));

    this.setState({
      good: 16 < goodFiltered.length ? 16 : goodFiltered.length,
      bad: 16 < badFiltered.length ? 16 : badFiltered.length,
      neutral: 19 < neutralFiltered.length ? 19 : neutralFiltered.length,
      goodFiltered: goodFiltered,
      neutralFiltered: neutralFiltered,
      badFiltered: badFiltered
    }, () => this.updateUrl());
  }

  matchPolitician = (politician, value, field) => {
    const { filtered, name, membership, party, candidacy } = this.state;
    var filteredValue = filtered;
    var nameValue = name.toLowerCase();
    var membershipValue = membership;
    var partyValue = party;
    var candidacyValue = candidacy;

    if ( field == 'view' ) {
      filteredValue = value;
      this.setState({filtered: value});
    } else if (field == 'membership') {
      membershipValue = value;
      this.setState({membership: value});
    } else if (field == 'name') {
      nameValue = value.toLowerCase();
      this.setState({name: value});
    } else if (field == 'party') {
      partyValue = value;
      this.setState({party: value});
    } else if (field == 'candidacy') {
      candidacyValue = value;
      this.setState({candidacy: value});
    }

    return (
      (
        filteredValue == 'All' ||
        politician.organization == filteredValue ||
        politician.state == filteredValue
      ) && (
        politician.first_name.toLowerCase().includes(nameValue) ||
        politician.last_name.toLowerCase().includes(nameValue)
      ) && (
        membershipValue == 'All' ||
        politician[membershipValue] == 'Yes'
      ) && (
        partyValue == 'All' ||
        politician.party == partyValue
      ) && (
        candidacyValue == 'All' ||
        politician.candidacy == candidacyValue
      )
    );
  }

  updateUrl = () => {
    const { filtered, name, membership, party, candidacy } = this.state;
    var filters = [];

    if(filtered) filters.push("filtered=" + filtered);
    if(name) filters.push("name=" + name);
    if(membership) filters.push("membership=" + membership);
    if(party) filters.push("party=" + party);
    if(candidacy) filters.push("candidacy=" + candidacy);

    var query = '';
    if (filters.length > 0) query = '?' + filters.join('&')
    history.pushState({
      id: 'home'
    }, 'Decide The Future', window.location.origin + query);
  }

  render() {
    const {
      good,
      neutral,
      bad,
      states,
      committees,
      caucuses,
      filtered,
      name,
      membership,
      party,
      candidacy,
      goodFiltered,
      neutralFiltered,
      badFiltered
    } = this.state;
    const loader = <div key={0} style={{width: '100%'}}>Loading ...</div>;

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
          <div>
            <label>Chamber or State:</label>
            <select
              onChange={e => this.filterPoliticians(e.target.value, 'view')}
              value={filtered}
            >
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
          </div>
          <div style={{marginTop: '15px'}}>
            <label>Organization Membership:</label>
            <select
              className='membership'
              style={{maxWidth: '300px'}}
              onChange={e => this.filterPoliticians(e.target.value, 'membership')}
              value={membership}
            >
              <option value='All'>All Members</option>
              <optgroup label="View by Committee">
                { Object.keys(committees).map(key => (
                  <option key={key} value={key}>{committees[key]}</option>
                )) }
              </optgroup>
              <optgroup label="View by Caucus">
                { Object.keys(caucuses).map(key => (
                  <option key={key} value={key}>{caucuses[key]}</option>
                )) }
              </optgroup>
            </select>
          </div>
          <div style={{marginTop: '15px'}}>
            <label>Political Party:</label>
            <select className='membership'
              style={{maxWidth: '300px'}}
              onChange={e => this.filterPoliticians(e.target.value, 'party')}
              value={party}
            >
              <option value='All'>All Parties</option>
              <option value='Democrat'>Democratic</option>
              <option value='Republican'>Republican</option>
            </select>
          </div>
          <div style={{marginTop: '15px'}}>
            <label>Presidential Candidacy:</label>
            <select className='membership'
              style={{maxWidth: '300px'}}
              onChange={e => this.filterPoliticians(e.target.value, 'candidacy')}
              value={candidacy}
            >
              <option value='All'>All Members</option>
              <option value='Yes'>Running</option>
              <option value=''>Not Running</option>
            </select>
          </div>
          <div style={{marginTop: '15px'}}>
            <label>Politician Name:</label>
            <input
              type='text'
              size='13'
              onChange={e => this.filterPoliticians(e.target.value, 'name')}
              placeholder='First/Last Name'
              value={name}
            />
          </div>
          <div className='politicians'>
            { good > 0 || bad > 0 ? (
              <div className="team internet">
                <h3>Team Internet <span>({goodFiltered.length})</span></h3>
                <em>These politicians are standing up for the free Internet and oppose mass surveillance.</em>
                <div
                  key={`good-${filtered}${name}`}
                  className='filtered politicians-scroll'
                >
                  <InfiniteScroll
                    pageStart={0}
                    loadMore={this.loadGood}
                    hasMore={good < goodFiltered.length}
                    loader={loader}
                    useWindow={false}
                    initialLoad={false}
                    className=""
                  >
                    {goodFiltered.slice(0, good).map((politician, i) => (
                      <Politician key={i} politician={politician} team='good' modal={i==1} />
                    ))}
                  </InfiniteScroll>
                </div>
              </div>
            ) : '' }
            { good > 0 || bad > 0 ? (
              <div className="team surveillance">
                <h3>Team Surveillance <span>({badFiltered.length})</span></h3>
                <em>These politicians are voting to give intelligence agencies a freer hand in spying on Americans.</em>
                <div
                  key={`bad-${filtered}${name}`}
                  className='filtered politicians-scroll'
                >
                  <InfiniteScroll
                    pageStart={0}
                    loadMore={this.loadBad}
                    hasMore={bad < badFiltered.length}
                    loader={loader}
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
              <h3>Unclear <span>({neutralFiltered.length})</span></h3>
              <div
                key={`neutral-${filtered}${name}`}
                className='filtered politicians-scroll'
              >
                <InfiniteScroll
                  pageStart={0}
                  loadMore={this.loadNeutral}
                  hasMore={neutral < neutralFiltered.length}
                  loader={loader}
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
