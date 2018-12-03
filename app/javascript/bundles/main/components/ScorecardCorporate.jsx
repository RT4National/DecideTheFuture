import React from 'react';

export default class ScorecardCorporate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expandGood: false,
      expandBad: false
    };
  }

  expandList = (list) => {
    if (list == 'good') {
      const { expandGood } = this.state;
      this.setState({expandGood: !expandGood});
    } else {
      const { expandBad } = this.state;
      this.setState({expandBad: !expandBad});
    }
  }

  render() {
    const { scorecard } = this.props;
    const { expandGood, expandBad } = this.state;

    return (
      <div className="scoreboard" id="scoreboard_corporate">
        <h2>Corporate Scorecard</h2>
        <p>
          We can protect the Internet, but to do that,
          we need to know who is helping us and who is working against us.{' '}
          <a href="#corporate-scorecard-methodology">See our scoring methodology </a>
        </p>
        <div className="corporate">
          <div className="team good">
            <i className="scoring teaminternet">Team Internet</i>
            <p>
              These companies are keeping the Internet open and free
              and oppose mass surveillance.
            </p>
          </div>
          <div className={`table-wrapper ${expandGood ? 'expanded' : ''}`} id="corporate-team-internet">
            <table>
              <tbody>
                <tr>
                  <th>
                    <i className="scoring badge">&#127775;</i>
                    For going above and beyond.
                  </th>
                  <th><span><strong>ECPA</strong>reform</span></th>
                  <th><span>save <strong>crypto</strong></span></th>
                  <th><span>stop <strong>CISA</strong></span></th>
                </tr>
                {scorecard.good.map(company => (
                  <tr key={company.label} className="good cookie">
                    <td>
                      <a href="#">
                        <i className={`logo logo-${company.label}`}></i>
                        <i className="scoring badge">&#127775;</i>
                        <span>{company.name}</span>
                      </a>
                    </td>
                    <td><i className="scoring good">&#9989;</i></td>
                    <td><i className="scoring good">&#9989;</i></td>
                    <td><i className="scoring good">&#9989;</i></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <a
              href="#corporate-team-internet"
              className="expand-me more good"
              onClick={() => this.expandList('good')}
            >
              { expandGood ? 'Less' : 'More' }
            </a>
          </div>
          <div className="team bad">
            <i className="scoring teamnsa">Team NSA</i>
            <p>
                These companies are collaborating with the government to control
                the Internet.
            </p>
          </div>
          <div className={`table-wrapper ${expandBad ? 'expanded' : ''}`} id="corporate-team-nsa">
            <table>
              <tbody>
                {scorecard.bad.map(company => (
                  <tr key={company.label} className="bad">
                    <td>
                      <a href="#">
                        <i className={`logo logo-${company.label}`}></i>
                        <span>{company.name}</span>
                      </a>
                    </td>
                    {company.scoring.map((score, i) => (
                      score == 'good' ? (
                        <td key={i} ><i className="scoring good">&#9989;</i></td>

                      ) : (
                        <td key={i}><i className="scoring bad">&#10062;</i></td>
                      )
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <a
              href="#corporate-team-nsa"
              className="expand-me more bad"
              onClick={() => this.expandList('bad')}
            >
              { expandBad ? 'Less' : 'More' }
            </a>
          </div>
        </div>
      </div>
    );
  }
}
