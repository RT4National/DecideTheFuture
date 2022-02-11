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
    axios.get(`https://sheets.googleapis.com/v4/spreadsheets/1d8HRGJU8p8tHDoTiSnVbqZuHTW9lSeqG-dWMyeC-v3E/values/newsb?key=${this.props.google_sheets_api_key}`)
      .then(res => {
        const { politicians, filtered } = this.processPoliticians(res.data.values);
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


    for (const entry of entries.slice(1)) {
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
    // var e = (field) => { return entry['gsx$'+field]['$t'].trim(); };

    var politician = {
      first_name:               entry[0],
      last_name:                entry[1],
      active:                   entry[2],
      voting:                   entry[3],
      organization:             entry[4],
      candidacy:                entry[5],
      intelligence:             entry[6],
      judiciary:                entry[7],
      homelandsecurity:         entry[8],
      armedservices:            entry[9],
      image:                    entry[10],
      state:                    entry[11],
      state_short:              states[entry[11]],
      party:                    entry[12],
      gender:                   entry[13],
      twitter:                  entry[14],
      bioguide:                 entry[15],
      freedom:                  entry[16],
      congressionalblack:       entry[17],
      congressionalprogressive: entry[18],
      fourthamendment:          entry[19],
      phone:                    entry[20],
      email:                    entry[21],
      vote_usaf:                entry[22],
      vote_tempreauth:          entry[23],

      // scorecard fields
      fisa_courts_reform_act:                                 entry[24],
      s_1551_iosra:                                           entry[25],
      fisa_improvements_act:                                  entry[26],
      fisa_transparency_and_modernization_act:                entry[27],
      surveillance_state_repeal_act:                          entry[28],
      usa_freedom_prior_to_20140518:                          entry[29],
      voted_for_conyers_amash_amendment:                      entry[30],
      voted_for_house_version_of_usa_freedom_act_2014:        entry[31],
      voted_for_massie_lofgren_amendment_2014:                entry[32],
      whistleblower_protection_for_ic_employees_contractors:  entry[33],
      first_usaf_cloture_vote:                                entry[34],
      straight_reauth:                                        entry[35],
      fisa_reform_act:                                        entry[36],
      amendment_1449_data_retention:                          entry[37],
      amendment_1450_extend_implementation_to_1yr:            entry[38],
      amendment_1451_gut_amicus:                              entry[39],
      final_passage_usaf:                                     entry[40],
      s_702_reforms:                                          entry[41],
      massie_lofgren_amendment_to_hr2685_defund_702:          entry[42],
      massie_lofgren_amendment_to_hr4870_no_backdoors:        entry[43],
      ECPA_reform_cosponsor:                                  entry[44],
      house_PCNA:                                             entry[45],
      house_NCPA:                                             entry[46],
      CISA_cloture_vote:                                      entry[47],
      franken_cisa_amendment:                                 entry[48],
      wyden_cisa_amendment:                                   entry[49],
      heller_cisa_amendment:                                  entry[50],
      coons_cisa_amendment:                                   entry[51],
      coons_cisa_amendment:                                   entry[52],
      cisa_final:                                             entry[53],
      mccain_4787:                                            entry[54],
      hr_5606_infosharingisstrength:                          entry[55],
      encryptioncommission:                                   entry[56],
      intel18:                                                entry[57],
      s_139:                                                  entry[58],
      fbi_search:                                             entry[59],
      query_warrant:                                          entry[60],
      fara:                                                   entry[61],
      h_r_2740:                                               entry[62],
      facial:                                                 entry[63],
      biometric:                                              entry[64],
      s2939:                                                  entry[65],
      sapra:                                                  entry[66],
      sapra2:                                                 entry[67],
      s3420:	                                                entry[68],
      h_r_6172:	                                              entry[69],
      earn:                                                   entry[70],
      sa1583:                                                 entry[71],
      sa1584:                                                 entry[72],
      sa1586:                                                 entry[73],
      h_r_7984:                                               entry[74],
      s1265:                                                  entry[75],
      uspisspa:                                               entry[76],
      s1423:                                                  entry[77],

      urban_rural:              entry[78],
      office1:                  entry[79],
      office1phone:             entry[80],
      office1geo:               entry[81],
      office2:                  entry[82],
      office2phone:             entry[83],
      office2geo:               entry[84],
      office3:                  entry[85],
      office3phone:             entry[86],
      office3geo:               entry[87],
      office4:                  entry[88],
      office4phone:             entry[89],
      office4geo:               entry[90],
      office5:                  entry[91],
      office5phone:             entry[92],
      office5geo:               entry[93],
      office6:                  entry[94],
      office6phone:             entry[95],
      office6geo:               entry[96],
      office7:                  entry[97],
      office7phone:             entry[98],
      office7geo:               entry[99],
      office8:                  entry[100],
      office8phone:             entry[101],
      office8geo:               entry[102],

      hr3707:                                                  entry[103],
      hr4350:                                                  entry[104],
      hr5524:                                                  entry[105],
      s2957:                                                   entry[106],
      hr6006:                                                  entry[107],
      s3343:                                                   entry[108],
      hr6185:                                                  entry[109]
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
        var inc = politician.organization === 'Senate' ? 3 : 1;
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
    // if (politician['s_702_reforms'] == 'X') {
    //     var inc = 4;
    //     score_criteria.push({
    //         score:  inc,
    //         info:   'Supported bills reforming Section 702 of FISA',
    //         url:undefined
    //     });
    //     score += inc;
    // }
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
        var inc = 1;
        score_criteria.push({
            score:  inc,
            info:   'Co-Sponsor of Electronic Communication Privacy Act Reform',
            url: 'https://www.eff.org/deeplinks/2015/09/senate-judiciary-committee-finally-focuses-ecpa-reform'
        });
        score += inc;
    }
    if (politician['CISA_cloture_vote'] == 'BAD') {
        var inc = -2;
        score_criteria.push({
            score:  inc,
            info:   'Voted for CISA Cloture Vote',
            url: 'http://www.slate.com/articles/technology/future_tense/2015/10/stopcisa_the_cybersecurity_information_sharing_act_is_a_disaster.html'
        });
        score += inc;
    }
    else if (politician['CISA_cloture_vote'] == 'GOOD') {
        var inc = 2;
        score_criteria.push({
            score: inc,
            info:   'Voted against CISA Cloture Vote',
            url: 'http://www.slate.com/articles/technology/future_tense/2015/10/stopcisa_the_cybersecurity_information_sharing_act_is_a_disasteecpareformcosponsorr.html'
        });
        score += inc;
    }
    if (politician['house_NCPA'] == 'BAD') {
        var inc = -1;
        score_criteria.push({
            score:  inc,
            info:   'Voted for National Cybersecurity Protection Advancement Act',
            url: 'http://techcrunch.com/2015/04/23/house-passes-complementary-cyber-information-sharing-bill/'
        });
        score += inc;
    }
    else if (politician['house_NCPA'] == 'GOOD') {
        var inc = 1;
        score_criteria.push({
            score: inc,
            info:   'Voted against National Cybersecurity Protection Advancement Act',
            url: 'http://techcrunch.com/2015/04/23/house-passes-complementary-cyber-information-sharing-bill/'
        });
        score += inc;
    }
    if (politician['house_PCNA'] == 'BAD') {
        var inc = -2;
        score_criteria.push({
            score:  inc,
            info:   'Voted for The Protecting Cyber Networks Act ',
            url: 'https://www.eff.org/deeplinks/2015/04/eff-congress-stop-cybersurveillance-bills'
        });
        score += inc;
    }
    else if (politician['house_PCNA'] == 'GOOD') {
        var inc = 2;
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
        url: 'https://clerk.house.gov/evs/2019/roll345.xml'
      });
      score += inc;
    }
    else if (politician['h_r_2740'] == 'No') {
      var inc = -4;
      score_criteria.push({
        score: inc,
        info:   'Voted not to add prohibitions on NSA reverse targeting to 2018 appropriations',
        url: 'https://clerk.house.gov/evs/2019/roll345.xml'
      });
      score += inc;
    }
    // if (politician['facial'] == 'Yes') {
    //   var inc = 3;
    //   score_criteria.push({
    //     score:  inc,
    //     info:   'Sponsored bill to prohibit use of facial recognition technology to identify or track an end user without consent',
    //     url: 'https://www.govtrack.us/congress/bills/116/s847'
    //   });
    //   score += inc;
    // }
    if (politician['biometric'] == 'Yes') {
      var inc = 4;
      score_criteria.push({
        score:  inc,
        info:   'Sponsored legislation to prohibit biometric recognition in most public and assisted housing',
        url: 'http://dearcolleague.us/2019/07/cosponsor-the-no-biometric-barriers-to-housing-act-of-2019-2/'
      });
      score += inc;
    }
    if (politician['s2939'] == 'Yes') {
      var inc = 3;
      score_criteria.push({
        score:  inc,
        info:   'Filed or cosponsored S. 2939, ending NSA call detail records program',
        url: 'https://www.congress.gov/bill/116th-congress/senate-bill/2939/cosponsors'
      });
      score += inc;
    }
    if (politician['sapra'] == 'Yes') {
      var inc = 4;
      score_criteria.push({
        score:  inc,
        info:   "Sponsored or cosponsored the Safeguarding Americans' Private Records Act to neuter PATRIOT Act mass surveillance",
        url: 'https://www.congress.gov/bill/116th-congress/senate-bill/3242/cosponsors?q={%22search%22:[%22safeguarding%22]}&r=15&s=2&searchResultViewType=expanded&KWICView=false'
      });
      score += inc;
    }
    if (politician['sapra2'] == 'Yes') {
      var inc = 4;
      score_criteria.push({
        score:  inc,
        info:   "Sponsored or cosponsored the Safeguarding Americans' Private Records Act to neuter PATRIOT Act mass surveillance",
        url: 'https://www.congress.gov/bill/116th-congress/house-bill/5675/cosponsors?q={%22search%22:[%22safeguarding+private%22]}&r=1&s=4&searchResultViewType=expanded&KWICView=false'
      });
      score += inc;
    }
    if (politician['s3420'] == 'Yes') {
      var inc = 2;
      score_criteria.push({
        score:  inc,
        info:   'Sponsored or cosponsored improvements to FISC amicus processes',
        url: 'https://www.congress.gov/bill/116th-congress/senate-bill/3420/cosponsors?q={%22search%22:[%22lee%22]}&r=2&s=7&searchResultViewType=expanded&KWICView=false'
      });
      score += inc;
    }
    if (politician['h_r_6172'] == 'Yes') {
      var inc = -2;
      var url = 'http://clerk.house.gov/evs/2020/roll098.xml'
      if (politician.organization === 'Senate') {
        url = 'https://www.senate.gov/legislative/LIS/roll_call_lists/roll_call_vote_cfm.cfm?congress=116&session=2&vote=00092'
      }
      score_criteria.push({
        score:  inc,
        info:   'Supported renewal of PATRIOT Act surveillance powers with cosmetic reforms',
        url: url
      });
      score += inc;
    } else if (politician['h_r_6172'] == 'No') {
      var inc = +2;
      var url = 'http://clerk.house.gov/evs/2020/roll098.xml'
      if (politician.organization === 'Senate') {
        url = 'https://www.senate.gov/legislative/LIS/roll_call_lists/roll_call_vote_cfm.cfm?congress=116&session=2&vote=00092'
      }
      score_criteria.push({
        score:  inc,
        info:   'Opposed renewal of PATRIOT Act surveillance powers with cosmetic reforms',
        url: url
      });
      score += inc;
    }
    if (politician['earn'] == 'Yes') {
      var inc = -3;
      score_criteria.push({
        score:  inc,
        info:   'Sponsored or cosponsored the EARN IT Act, which would enable the federal government to muscle private firms into not providing end-to-end encryption',
        url: 'https://www.congress.gov/bill/116th-congress/senate-bill/3398/cosponsors?q={%22search%22:[%22earn+it+act%22]}&r=1&s=9&searchResultViewType=expanded&KWICView=false'
      });
      score += inc;
    }
    if (politician['sa1583'] == 'Yes') {
      var inc = 3;
      score_criteria.push({
        score:  inc,
        info:   'Voted for amendment to prohibit FBI collection of web browsing history without a warrant',
        url: 'https://www.senate.gov/legislative/LIS/roll_call_lists/roll_call_vote_cfm.cfm?congress=116&session=2&vote=00089'
      });
      score += inc;
    } else if (politician['sa1583'] == 'No') {
      var inc = -3;
      score_criteria.push({
        score:  inc,
        info:   'Voted against amendment to prohibit FBI collection of web browsing history without a warrant',
        url: 'https://www.senate.gov/legislative/LIS/roll_call_lists/roll_call_vote_cfm.cfm?congress=116&session=2&vote=00089'
      });
      score += inc;
    }
    if (politician['sa1584'] == 'Yes') {
      var inc = 2;
      score_criteria.push({
        score:  inc,
        info:   'Voted for improving FISA Court transparency by requiring civil liberties amicus in most situations',
        url: 'https://www.senate.gov/legislative/LIS/roll_call_lists/roll_call_vote_cfm.cfm?congress=116&session=2&vote=00090'
      });
      score += inc;
    } else if (politician['sa1584'] == 'No') {
      var inc = -2;
      score_criteria.push({
        score:  inc,
        info:   'Voted against improving FISA Court transparency by requiring civil liberties amicus in most situations',
        url: 'https://www.senate.gov/legislative/LIS/roll_call_lists/roll_call_vote_cfm.cfm?congress=116&session=2&vote=00090'
      });
      score += inc;
    }
    if (politician['sa1586'] == 'Yes') {
      var inc = 4;
      score_criteria.push({
        score:  inc,
        info:   'Voted for prohibiting use of Executive Order 12,333-derived information in prosecutions of US persons',
        url: 'https://www.senate.gov/legislative/LIS/roll_call_lists/roll_call_vote_cfm.cfm?congress=116&session=2&vote=00091'
      });
      score += inc;
    } else if (politician['sa1586'] == 'No') {
      var inc = -2;
      score_criteria.push({
        score:  inc,
        info:   'Voted against prohibiting use of Executive Order 12,333-derived information in prosecutions of US persons',
        url: 'https://www.senate.gov/legislative/LIS/roll_call_lists/roll_call_vote_cfm.cfm?congress=116&session=2&vote=00091'
      });
      score += inc;
    }
    if (politician['h_r_7984'] == 'Yes') {
      var inc = 3;
      score_criteria.push({
        score:  inc,
        info:   "Supports requiring internal civil liberties review of DHS intelligence products before circulation",
        url: 'https://www.congress.gov/bill/116th-congress/house-bill/7984/cosponsors?r=5&s=1&searchResultViewType=expanded'
      });
      score += inc;
    }
    if (politician['s1265'] == 'Yes') {
      var inc = 4;
      score_criteria.push({
        score:  inc,
        info:   "Original cosponsor of the Wyden-Daines 'Fourth Amendment Is Not For Sale Act'",
        url: 'https://www.congress.gov/bill/117th-congress/senate-bill/1265/cosponsors?searchResultViewType=expanded'
      });
      score += inc;
    }
    if (politician['uspisspa'] == 'Yes') {
      var inc = 3;
      score_criteria.push({
        score:  inc,
        info:   "Original cosponsor of bill to end covert internet surveillance by US Postal Intelligence Service",
        url: 'https://gaetz.house.gov/media/press-releases/congressman-matt-gaetz-leads-9-lawmakers-push-abolish-uspis-s-internet-covert'
      });
      score += inc;
    }
    if (politician['s1423'] == 'Yes') {
      var inc = 3;
      score_criteria.push({
        score:  inc,
        info:   "Supports requiring tech companies to give children an easy way to erase the data held on them.",
        url: 'https://www.congress.gov/bill/117th-congress/senate-bill/1423/cosponsors?r=73&s=1'
      });
      score += inc;
    }
    if (politician['hr3707'] == 'Yes') {
      var inc = -3;
      score_criteria.push({
        score:  inc,
        info:   'Cosponsored a toothless bill, the "No Trace Act", that exempts intelligence services from any limits on warrantless acquisition of datasets.',
        url: 'https://www.congress.gov/bill/117th-congress/house-bill/3707/cosponsors'
      });
      score += inc;
    }
    if (politician['hr4350'] == 'Yes') {
      var inc = 3;
      score_criteria.push({
        score:  inc,
        info:   'Voted YES to restrict "1033" military equipment going to police departments.',
        url: 'https://clerk.house.gov/Votes/2021281'
      });
      score += inc;
    } else if (politician['hr4350'] == 'No') {
      var inc = -3;
      score_criteria.push({
        score:  inc,
        info:   'Voted NO to restrict "1033" military equipment going to police departments.',
        url: 'https://clerk.house.gov/Votes/2021281'
      });
      score += inc;
    }
    if (politician['hr5524'] == 'Yes') {
      var inc = 2;
      score_criteria.push({
        score:  inc,
        info:   'Cosponsored bill protecting US persons\' devices from warrantless searches at the "border".',
        url: 'https://www.congress.gov/bill/117th-congress/house-bill/5524/cosponsors'
      });
      score += inc;
    }
    if (politician['s2957'] == 'Yes') {
      var inc = 2;
      score_criteria.push({
        score:  inc,
        info:   'Cosponsored bill protecting US persons\' devices from warrantless searches at the "border".',
        url: 'https://www.congress.gov/bill/117th-congress/senate-bill/2957/cosponsors'
      });
      score += inc;
    }
    if (politician['hr6006'] == 'Yes') {
      var inc = 3;
      score_criteria.push({
        score:  inc,
        info:   'Opposes intrusive financial surveillance of cryptocurrency users.',
        url: 'https://www.congress.gov/bill/117th-congress/house-bill/6006/cosponsors'
      });
      score += inc;
    }
    if (politician['s3343'] == 'Yes') {
      var inc = 4;
      score_criteria.push({
        score:  inc,
        info:   'Supports US citizens being allowed to sue federal government agents for deprivation of rights.',
        url: 'https://www.congress.gov/bill/117th-congress/senate-bill/3343/cosponsors'
      });
      score += inc;
    }
    if (politician['hr6185'] == 'Yes') {
      var inc = 4;
      score_criteria.push({
        score:  inc,
        info:   'Supports US citizens being allowed to sue federal government agents for deprivation of rights.',
        url: 'https://www.congress.gov/bill/117th-congress/house-bill/6185/cosponsors'
      });
      score += inc;
    }

    if (score_criteria.length == 0) {
      var grade = '?';
    } else if(score > 30){
      var grade="A+";
    }
    else if(score > 24){
      var grade="A";
    }
    else if(score > 18){
      var grade="A-";
    }
    else if(score > 13){
      var grade="B+";
    }
    else if(score > 9){
      var grade="B";
    }
    else if(score > 5){
      var grade="B-";
    }
    else if(score > 2){
      var grade="C+";
    }
    else if(score > -1){
      var grade="C";
    }
    else if(score > -3){
      var grade="C-";
    }
    else if(score > -6){
      var grade="D+";
    }
    else if(score > -7){
      var grade="D";
    }
    else if(score > -16){
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
      nameValue = value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
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
        (
          politician.first_name + ' ' + politician.last_name
        ).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(nameValue)
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
              <option value='Independent'>Independent</option>
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
                <h3>Team Privacy <span>({goodFiltered.length})</span></h3>
                <em>These politicians are standing up to oppose mass government surveillance.</em>
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
