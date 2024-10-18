import React from 'react'

interface LabledFieldProps {
	data: {
		[key: string]: React.ReactNode
	}
}

function LabledField({ data }: LabledFieldProps) {
	return (
		<div className="labled-field">
			{Object.entries(data).map(([label, children]) => (
				<div key={label} className="labled-field__item">
					<div className="labled-field__row">
						<div className="labled-field__label">{label}</div>
						<div className="labled-field__children">{children}</div>
					</div>
				</div>
			))}
		</div>
	)
}

export default LabledField
