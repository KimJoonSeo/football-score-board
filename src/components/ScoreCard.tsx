import { Avatar, Card, Popover, Typography } from 'antd'
import { Event, ScoringInfo, TeamInfo } from '../types'
import React from 'react'
import { FootballIcon } from '../resources'

const Team: React.FC<TeamInfo> = (props) => {
  const content = props.scoringInfoList.map((value, index) => {
    const og = value.ownGoal ? ' OG' : ''
    const pk = value.penaltyKick ? ' PK' : ''

    return (
      <p key={index}>
        <FootballIcon />
        {value.scorer} ({value.displayValue}
        {og}
        {pk})
      </p>
    )
  })

  return (
    <Card.Meta
      avatar={<Avatar src={props.team.logo} />}
      title={
        <div className="ant-card-head-wrapper">
          <div className="ant-card-head-title">{props.team.abbreviation}</div>
          <div className="ant-card-extra">
            {props.scoringInfoList.length > 0 ? (
              <Popover content={<div>{content}</div>} placement={'leftTop'}>
                <Typography.Text strong underline>
                  {props.score}
                </Typography.Text>
              </Popover>
            ) : (
              <Typography.Text strong underline>
                {props.score}
              </Typography.Text>
            )}
          </div>
        </div>
      }
      description={`(${props.records[0].summary})`}
    />
  )
}
export const ScoreCard: React.FC<Event> = (props) => {
  let title = 'unknown'
  let style = { color: '' }
  const status = props.status
  const home = props.competitions[0].competitors[0]
  const away = props.competitions[0].competitors[1]
  const details = props.competitions[0].details
  const homeScoringInfo: ScoringInfo[] = []
  const awayScoringInfo: ScoringInfo[] = []
  for (const detail of details) {
    if (!detail.scoringPlay) continue
    if (detail.team.id === home.id) {
      homeScoringInfo.push({
        ownGoal: detail.ownGoal,
        displayValue: detail.clock.displayValue,
        penaltyKick: detail.penaltyKick,
        scorer: detail.athletesInvolved[0].shortName,
      })
    } else {
      awayScoringInfo.push({
        ownGoal: detail.ownGoal,
        displayValue: detail.clock.displayValue,
        penaltyKick: detail.penaltyKick,
        scorer: detail.athletesInvolved[0].shortName,
      })
    }
  }
  switch (status.type.state) {
    case 'pre':
      title = status.type.detail.includes('at ')
        ? status.type.detail.split('at ')[1]
        : status.type.detail
      style.color = '#b9b7b7'
      break
    case 'in':
      title = status.displayClock
      style.color = '#d51d1d'
      break
    case 'post':
      title = status.type.description
      break
  }

  return (
    <Card size={'small'}>
      <Typography.Paragraph style={{ color: style.color }}>
        {title}
      </Typography.Paragraph>
      <Team
        team={home.team}
        score={home.score}
        records={home.records}
        id={home.id}
        scoringInfoList={homeScoringInfo}
      />
      <br />
      <Team
        team={away.team}
        score={away.score}
        records={away.records}
        id={away.id}
        scoringInfoList={awayScoringInfo}
      />
    </Card>
  )
}
