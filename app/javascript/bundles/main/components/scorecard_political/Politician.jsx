import React from 'react';
import PoliticianModal from './PoliticianModal';

export default class Politician extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      modal: false
    };
  }

  toggleModal = () => {
    const { modal } = this.state;
    this.setState({ modal: !modal });
  }

  render() {
    const { politician, team } = this.props;
    const { modal } = this.state;
    return (
      <div className={team}>
        { modal ? (
          <PoliticianModal politician={politician} toggleModal={this.toggleModal}/>
        ): '' }
        <div className='peekaboo'>
          <div className='politician'>
            <div className={team}>
              <div
                className='headshot'
                style={ politician.image ? ({
                    backgroundImage: `url("/congress/${politician.image}")`
                  }) : {}
                }
              >
                <div className='congressional-head' ></div>
              </div>
              <h4>{politician.last_name}</h4>
              <h3 className='grade'>{politician.grade}</h3>
              <div className='rollover'>
                { politician.twitter ? (
                  <a href={`https://twitter.com/intent/tweet?text=%40${politician.twitter} Congress is considering this year whether to renew the government's mass surveillance powers, including Section 702 of FISA. This power has been abused for years to violate our privacy rights [link to: https://restorethe4th.com/wp-content/uploads/2023/03/Sec.-702-Violations-Handout.pdf]. Please vote for bills to rein in government surveillance in 2023!`}>
                    <button className='tweet_link'></button>
                  </a>
                ) : '' }
                <button className='info_link' onClick={this.toggleModal}>i</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
