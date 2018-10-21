import React from 'react'

const CardInfo = props => {

  const teamName = (teams, team) => {
    let data = teams.find(item => (
      item.id === team
    ))

    if(data) {
      return data.name
    }
  }

  return (
    <div>
      <span className="badge badge-secondary">
        { teamName(props.teams, props.team) }
      </span>
      <span className="badge badge-primary">{props.date}</span>
    </div>
  )
}

export default CardInfo;