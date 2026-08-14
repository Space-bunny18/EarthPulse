import "./Explorer.css";

export default function Timeline() {
    return (
        <div className="timeline">

            <div className="timeline-left">
                <button
                    className="timeline-play"
                    aria-label="Play timeline"
                >
                    ▶
                </button>

                <span className="timeline-range">
                    -24H
                </span>
            </div>


            <div className="timeline-center">

                <div className="timeline-track">

                    <div className="timeline-progress">
                    </div>

                    <div className="timeline-marker">
                    </div>

                </div>

                <div className="timeline-labels">
                    <span>24H</span>
                    <span>12H</span>
                    <span>6H</span>
                    <span>NOW</span>
                </div>

            </div>


            <div className="timeline-live">

                <span className="timeline-live-dot">
                </span>

                LIVE

            </div>

        </div>
    );
}