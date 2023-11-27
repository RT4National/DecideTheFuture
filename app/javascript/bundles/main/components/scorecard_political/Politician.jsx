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
                  <a href={`https://twitter.com/intent/tweet?text=%40${politician.twitter} @Restore_The4th Congress is considering this year whether to reauthorize Section 702 of `+ '%23' + `FISA. Please cosponsor the Government Surveillance Reform Act, S. 3234 / H. R. 6262, to restore our privacy rights ` + '%23' + `FISAReformNow`}>
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
