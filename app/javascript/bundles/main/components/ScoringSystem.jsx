import React from 'react';

export default class ScoringSystem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: ''
    };
  }

  expandArticle = () => {
    this.setState({expanded: 'expanded'});
  }

  render() {
    const { expanded } = this.state;

    return (
      <article id="our-scoring-system" className={expanded}>
        <h1>
          <a href="#our-scoring-system" className="expand-me">
            Our Scoring System
          </a>
        </h1>
        <time dateTime="Fri, 11 Sep 2015 00:00:00 -0700"></time>
        <h3>Project History and Cosponsors</h3>

        <p className='just'>
          {'This scorecard is a joint project of '}
          <a href="https://restorethe4th.com">{' Restore The Fourth '}</a>
          {' and '}
          <a href="https://fightforthefuture.org">Fight for the Future</a>.
        </p>
        <p className='just'>
          The scorecard is objective, rather than qualitative. That is, scores
          are based on actual votes and legislative actions such as co-sponsorships,
          rather than the quality or trustworthiness of legislators' public actions
          or statements on mass surveillance. This creates two kinds of error. One,
          that a legislator may strategically work behind the scenes in one direction,
          and then vote in public on the other; two, that a legislator may show
          up forvotes, but not take interest in moving the cause forward in between
          rare voting opportunities. Both kinds of legislator exist in our database,
          but no more objective method exists.
        </p>

        <ul>
          <li>
            Version 1.0 of this Scorecard was EFF’s{' '}
            <a href="https://standagainstspying.org" target='_blank'>
              Stand Against Spying
            </a>
            {' '}launched in 2012.
          </li>
          <li>
            Version 2.0 launched September 29, 2015, and scored Congressional
            votes on the USA FREEDOM Act of 2015 and FISA reform bills not included
            in v. 1.0.
            Version 2.0 launched September 29, 2015 as a joint project of{' '}
            <a href="https://restorethe4th.com/" target='_blank'>Restore The Fourth</a>{' and '}
            <a href='https://fightforthefuture.org/' target='_blank'>Fight for the Future</a>{' '}
            and scored Congressional votes on the USA FREEDOM Act of 2015 and
            FISA reform bills not included in v. 1.0.
          </li>
          <li>
            Version 3.0 relaunched January 21, 2019 as a project administered
            solely by
            {' '}<a href="https://restorethe4th.com/" target='_blank'>Restore The Fourth</a>{' '}
            but still with the approval of Fight for the Future. It restructured
            the internal code of the site, added search features by party, committees
            and caucuses, and added votes on Section 702 renewal.
          </li>
        </ul>

        <h4><strong>Summary of Points Allocations and Grade Boundaries</strong></h4>

        <p className='just'>
          As further relevant votes come up, they will be added to the points
          system.
        </p>

        <h5>113th Congress (2013-14):</h5>

        <p className='just'>
          Sponsored or cosponsored S. 1551, IOSRA (Yes=+4)<br/>
          Sponsored or cosponsored FISA Improvements Act (Yes=-4)<br/>
          Sponsored or cosponsored FISA Transparency & Modernization Act (Yes=-4)<br/>
          Sponsored or cosponsored Surveillance State Repeal Act (2014 or 2015) (Yes=+4)<br/>
          Sponsored or cosponsored USA FREEDOM 2014 prior to 2014-05-18 (Yes=+2)<br/>
          Before this date, USA FREEDOM was a substantially stronger piece of
          legislation, meriting +2 rather than +1.<br/>
          Voted for Conyers/Amash amendment (Yes=+4)<br/>
          Voted for House version of USA FREEDOM 2014 (Yes=-2).<br/>
          This gutted version of USA FREEDOM was weaker than what eventually
          passed in the 114th Congress, meriting -2 points.<br/>
          Voted for Massie-Lofgren amendment 2014 (Yes = +3)<br/>
        </p>

        <h5>114th Congress (2015-16):</h5>

        <p className='just'>
          Sponsored or cosponsored whistleblower protection for IC employees/contractors (Yes=+4)<br/>
          1st USA FREEDOM 2015 cloture vote (Yes=+1, No=+4 or =-4= conditional
          on straight reauth vote)<br/>
          Straight reauth (Yes=-3)<br/>
          Sponsored or cosponsored FISA Reform Act (Yes=-3)<br/>
          Amendment 1449 to USA FREEDOM 2015: Data retention (No=+1, Yes=-3)<br/>
          Amendment 1450 to USA FREEDOM 2015: Extend implementation to 1yr (No=+1, Yes=-2)<br/>
          Amendment 1451 to USA FREEDOM 2015: Gut amicus (No=+1, Yes=-3)<br/>
          Final passage USA FREEDOM 2015 (Yes=+1, No=+4 or =-4<br/>
          conditional on straight reauth vote)<br/>
          House vote on PCNA (Yes=-3, No=+3)<br/>
          House vote on NCPAA (Yes=-2, No=+2)<br/>
          Massie-Lofgren amendment to HR2685: Defund 702 (Yes=+3/No=-3)<br/>
          Massie-Lofgren amendment on HR4870: No Encryption Backdoors (Yes=+3/No=-3)<br/>
          Senate vote for cloture on CISA (Yes=-4, No=+4)<br/>
          Senate vote on Franken amendment to CISA (narrowing definition of
          cybersecurity threat) (Yes=+2/No=-1)<br/>
          Senate vote on Wyden amendment to CISA (companies must scrub personal
          data) (Yes=+2/No=-1)<br/>
          Senate vote on Heller amendment to CISA (DHS must scrub personal data)
          (Yes=+1/No=-1)<br/>
          Senate vote on Coons amendment to CISA (limit information sharing to
          that necessary to describe or identify a cybersecurity threat) (Yes=+1/No=-1)<br/>
          Senate vote on Cotton amendment (removes liability for bypassing DHS
          to share data with FBI and Secret Service) (Yes=-2/No=+1)<br/>
          Cosponsored ECPA reform bill in 114th Congress (Yes=+2)<br/>
          Sponsored or cosponsored bill proposing Section 702 reforms in 114th
          Congress (Yes=+4)<br/>
        </p>

        <h5>115th Congress (2017-18):</h5>
        <p className='just'>
          House vote in Judiciary Committee to amend the USA Liberty Act to close
          the FBI backdoor search loophole (Yes=+2/No=-2)<br/>
          Senate vote in Intelligence Committee to amend FARA to require warrant
          before querying Section 702 data (Yes=+2/No=-2)<br/>
          House vote for/against the USA RIGHTS Act to rein in mass surveillance
          under Section 702 of the FISA Amendments Act (Yes=+4/No=-4)<br/>
          Senate vote for/against cloture on bill extending Section 702 mass
          surveillance powers (Yes=+4/No=-4)<br/>
        </p>

        <p className='just'>
          We set the grade boundaries unevenly, because the legislators are
          themselves distributed unevenly. The buckets are generally narrower in
          the middle of the distribution than at either end.
        </p>

        <h3>Methodological Issues in Allocating Points</h3>

        <p className='just'>
          Two notable difficulties that arose when formulating the scorecard
          were how to interpret votes on the USA FREEDOM Act, and how to score
          amendments.
        </p>

        <p className='just'>
          USA FREEDOM 2015 votes were not a clear signal of being for or
          against surveillance reform. The USA FREEDOM Act changed the process of
          surveillance by separating surveillance procedures but many organizations
          and legislators warned that it preserves and modernizes the same
          surveillance authorities, while enabling Congress to say it tackled
          surveillance reform. Therefore, Yes votes are graded at -1. However,
          because of the nature of the bill, a No vote could mean 1. that the
          legislator thought the USA FREEDOM Act didn't go nearly far enough
          or 2. that even very weak reforms are unacceptable there shouldn't
          be any restrictions of surveillance authorities. Therefore No votes
          in the Senate were tied to the legislator’s vote on whether to do
          "straight reauthorization" of Section 215 of the PATRIOT Act. A Yes
          on straight reauthorization indicated clearly that they wanted no
          surveillance reform whatsoever, and therefore that if they then
          voted No on the USA FREEDOM Act, it was because they believed it went
          too far. Conversely, a Senator voting No on straight reauthorization
          and then No on the USA FREEDOM Act likely felt that the USA FREEDOM Act
          was far too weak. For the former group, we coded a No vote on USA FREEDOM
          as -4 points; for the latter group, we coded the same vote as +4 points.
          In the House, we went back to EFF's "Stand Against Spying" scorecard
          and analyzed the grades of the 88 House members voting against the USA
          FREEDOM  Act, and found that in almost all cases their grades on that
          prior scorecard were very high. Consequently, all House No votes on USA
          FREEDOM were coded as +4. For prior votes on the 2014 version of USA
          FREEDOM, we adopted EFF's approach, and scored the version before it
          was gutted at +2 and the version after it was gutted at -2.
        </p>
        <p className='just'>
          Scoring amendments to CISA posed complexities. CISA
          went beyond cybersecurity policies and is a surveillance bill. Many
          amendments were offered, and that raised the problem that legislators
          might vote for CISA on cloture (-4) and on final passage (-4), but might
          vote in favor of all anti-surveillance amendments, and thereby come out
          ahead on net. We dealt with this by not scoring the Leahy amendment
          (relating to FOIA exemptions) and by allocating points such that a
          legislator like this would come out slightly behind on points.
        </p>

        <h4>Reporting Accurately on Surveillance Reform</h4>
        <p className='just'>
          This project threw up several important findings relevant to journalists
          reporting on surveillance, and to members of the public deciding how to vote and
          whom to fund.
        </p>
        <p className='just'>
          First, and most importantly, party affiliation is not a guide to your
          legislator's stance on mass surveillance. We find a few Democrats with Fs and
          many Republicans with A+. So while not entirely useless, party affiliation is
          highly unreliable, and journalists should steer clear of identifying a
          party-based stance on surveillance in their reporting.
        </p>
        <p className='just'>
          Second, reporters should not treat the reforms in the USA FREEDOM Act as being
          the most radical reform measures in Congress. The scorecard includes many
          examples of stronger reforms that have garnered substantial support. As we move
          forward into discussions of reforms to the much more abusive Section 702 of the
          FISA Amendments Act, which sunsets in June 2017, it will be worth bearing in
          mind the substantial, bipartisan set of legislators who never intended reform
          efforts to stop with the passage of the USA FREEDOM Act.
        </p>
        <p className='just'>
          Third, the data does provide some guidance as to who in Congress is more likely
          to support reform. There is also usually substantial variation within states
          that argues against easy conclusions. In key 2016 races around the country, the
          candidates running from both parties have sharply different positions on
          surveillance, and we have no reason to suppose that this will change in future
          cycles.
        </p>

        <a
          href="#our-scoring-system"
          className="expand-me more"
          onClick={this.expandArticle}
        >
          Learn more...
        </a>
      </article>
    );
  }
}
