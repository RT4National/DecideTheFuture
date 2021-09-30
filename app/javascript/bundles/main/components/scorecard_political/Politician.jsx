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
                  <a href={`https://twitter.com/intent/tweet?text=%40${politician.twitter} HR 3684's §80603 could destroy financial privacy for immigrants, cryptocurrency miners and small-scale traders of cryptocurrency. It's OK for them to not always know the SSNs of the people they trade with. %23DontKillCrypto`}>
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
