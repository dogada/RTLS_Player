import { Component } from 'react'
import { PathLine } from 'react-svg-pathline'
import { translate, translateDistance } from '../utils/session'

export default class Track extends Component {

  getVisiblePoints () {
    let { points, start, end, color } = this.props
    let visible = points.filter(p => (p.ts >= start && p.ts <= end))
    if (visible.length === 1) visible = points.slice(0, 1) // show 1 point at least
    console.log(`show ${visible.length} from ${points.length} for '${color}', start:${start}, end:${end}, last point:`, visible[visible.length - 1])
    return visible
  }

  renderSignal (signal) {
    let loc = this.props.location
    let device = loc.devices.find(d => d.id === signal.id)
    if (!device) {
      console.warn('No device for ', signal)
      return null
    }
    let [lon, lat] = device.coords
    let center = translate(lon, lat, loc)
    let radius = translateDistance(signal.distance, loc)
    let style = {
      fill: 'none',
      strokeWidth: 1,
      strokeDasharray: '5 10',
      stroke: this.props.color
    }
    return (
      <circle cx={center.x} cy={center.y} r={radius} style={style}>
        <title>{signal.id}, rssi: {signal.rssi}, distance: {signal.distance.toFixed(2)}</title>
      </circle>
    )
  }

  renderSignals (signals) {
    if (signals && signals.length) {
      return signals.map(s => this.renderSignal(s))
    }
    return null
  }

  renderPoint (point) {
    let loc = this.props.location
    let center = translate(point.lon, point.lat, loc)
    let signalsCount, details
    if (typeof point.signals === 'number') {
      signalsCount = point.signals
    } else {
      signalsCount = (point.signals && point.signals.length) || 0
      details = point.signals
        .slice()
        .sort((a, b) => b.rssi - a.rssi)
        .map(s => `${s.id}: ${s.rssi} (${s.distance.toFixed(2)})`)
        .join('; ')
    }
    let style = {
      fill: signalsCount >= 4 ? this.props.color : 'magenta'
    }
    return (
      <circle cx={center.x} cy={center.y} r={8} style={style}>
        <title>{signalsCount}, ts: {point.ts}, signals: {details}</title>
      </circle>
    )
  }

  render () {
    let points = this.getVisiblePoints()
    if (!points || !points.length) return null
    let lastPoint = points[points.length - 1]
    return (
      <svg>
        <PathLine
          points={points}
          stroke={this.props.color}
          strokeWidth='2'
          fill='none'
          r={0} />
        {this.renderPoint(lastPoint)}
        {this.renderSignals(lastPoint.signals)}
      </svg>
    )
  }
}

Track.defaultProps = {
  color: 'red',
  points: [],
  start: 0,
  end: 10000
}
