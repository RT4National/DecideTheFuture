import React from 'react';

export default class Politician extends React.Component {

  render() {
    const { politician, team } = this.props;
    return (
      <div className={team}>
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
                <button className='tweet_link'></button>
                <button className='info_link'>i</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
