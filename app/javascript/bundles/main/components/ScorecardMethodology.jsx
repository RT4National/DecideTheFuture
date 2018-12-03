import React from 'react';

export default class ScorecardMethodology extends React.Component {
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
      <article id='corporate-scorecard-methodology' className={expanded}>
        <h1>
          <a href="#corporate-scorecard-methodology" className="expand-me">
            Corporate Scorecard Methodology
          </a>
        </h1>
        <time dateTime="Sat, 12 Sep 2015 00:00:00 -0700"></time>
        <p className='just'>
          Companies are rated based on their roles in supporting or opposing legislative
          policies addressing warrantless surveillance of Internet communications and data
          insecurity. Companies that support the position that would limit surveillance
          and data insecurity on allthree bills are included on “Team Internet.” Companies
          that support the position that furthers surveillance and data insecurity on an
          of the bills are on “Team NSA.”
          <a href="https://docs.google.com/spreadsheets/d/1sIBDvYEaJm4-NoEwOxUu4vAR4C-VTPzAR4O079pspQ4/pubhtml">
            Sources and raw data are here.
          </a>
        </p>
        <p className='just'>
          Because positions can change, the most recent statement from a company (or a
          trade group representing them) is used to determine their position. Statements
          can take the form of any legitimate company communication or action—blog posts,
          letters to Congress, tweets, trade statements, or anything else. Trade
          associations and coalitions are assumed to speak for all of their member
          organizations. Statements from employees and CEOs, unless specifically stated as
          the company, will not be considered for this because they do not necessarily
          reflect the corporate position.
        </p>
        <p className='just'>
          Companies that have made their own statement on CISA, separate from their trade
          groups, are listed higher up in rankings and recognized with a special star
          next to their name. Companies that have no known position are considered
          “silent” and categorized with Team NSA.
        </p>
        <p className='just'>
          This scorecard looks at the top tech, software, Internet, and telecom companies
          by valuation, revenue, and Internet ranking. It also includes other companies
          that have made efforts to have stances on these three policies.
        </p>
        <a
          href="#corporate-scorecard-methodology"
          className="expand-me more"
          onClick={this.expandArticle}
        >
          Learn more...
        </a>
      </article>
    );
  }
}
