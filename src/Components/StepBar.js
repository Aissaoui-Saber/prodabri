import '../Assets/Styles/global_Style.css';
import '../Pages/publication/Publication.css';
import { useState, useEffect, useRef } from 'react';


function StepBar({ data, currStep }) {
	const ref = useRef(null);
	const [svgWidth, setSvgWidth] = useState(0);
	const [currentStep, setCurrentStep] = useState(currStep);
	let stepBarMarginLR = svgWidth / data.length / 2;
	let stepBarStartPostitionX = stepBarMarginLR;

	let darkBlue = "#050D1A";
	let lightBlue = "#108DDE";



	function setEmptySteps() {
		let s = [];
		for (let i = 0; i < data.length; i++) {
			s.push(<circle key={i} cx={((svgWidth - (stepBarMarginLR * 2)) / (data.length - 1)) * i + stepBarMarginLR} cy="20" r="20" fill={darkBlue} />);
		}
		return s;
	}
	function goToStep(n) {
		let s = [];
		if (n < data.length && n >= 0) {
			s.push(<rect x={stepBarMarginLR} y="17" width={((svgWidth - (stepBarMarginLR * 2)) / (data.length - 1)) * n} height="6" fill={lightBlue} />)
			for (let i = 0; i <= n; i++) {
				s.push(<circle key={i} cx={((svgWidth - (stepBarMarginLR * 2)) / (data.length - 1)) * i + stepBarMarginLR} cy="20" r="14" fill={lightBlue} />);
			}
		}
		return s;
	}
	function setTitlesColor(n) {
		let s = [];
		for (let i = 0; i < data.length; i++) {
			if (i <= n && n < data.length && n >= 0) {
				s.push(<td key={i} className='stepBar__names__name' style={{ color: 'var(--accent-blue)' }}>{data[i]}</td>);
			} else {
				s.push(<td key={i} className='stepBar__names__name' style={{ color: 'var(--dark-text)' }}>{data[i]}</td>);
			}
		}
		return s;
	}

	useEffect(() => {
		setSvgWidth(ref.current.offsetWidth);
	}, [ref.current]);
	useEffect(() => {
		setCurrentStep(currStep);
	}, [currStep]);

	return <div key={13} className="stepBar" ref={ref}>
		<svg width={svgWidth} height="40">
			<rect x={stepBarStartPostitionX} y="13" width={svgWidth - stepBarMarginLR * 2} height="14" fill={darkBlue} />
			{
				setEmptySteps(data)
			}
			{
				goToStep(currentStep)
			}
		</svg>
		<table className="stepBar__names">
			<tbody>
				<tr>
					{
						setTitlesColor(currentStep)
					}
				</tr>
			</tbody>
		</table>
	</div>

};

export default StepBar;
