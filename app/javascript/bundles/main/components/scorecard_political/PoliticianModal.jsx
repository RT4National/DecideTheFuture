import React from 'react';

export default class PoliticianModal extends React.Component {

  render() {
    const { politician, toggleModal } = this.props;
    return (
      <div className='modal politician_modal'>
        <div className='politician-modal-content'>
          <button className='close' onClick={toggleModal}>X</button>
          <h2>{`How ${politician.first_name} ${politician.last_name} Voted...`}</h2>
          <ul>
            { politician.score_criteria.map((data, i) => (
              <li key={i} className={data.score < 0 ? 'bad' : 'good'}>
                { data.url ? (
                  <a href={data.url} target='_blank'>
                    {data.info}
                  </a>
                ) : data.info  }
              </li>
            )) }
          </ul>
        </div>
      </div>
    );
  }
}
