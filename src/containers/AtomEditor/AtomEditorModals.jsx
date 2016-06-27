import React, {PropTypes} from 'react';
import Radium from 'radium';

let styles = {};

export const AtomEditorModals = React.createClass({
	propTypes: {
		mode: PropTypes.string,
		closeModalHandler: PropTypes.func,
	},

	render: function() {
		return (
			<div style={[styles.container, this.props.mode && styles.containerActive]}>
				<div style={styles.splash} onClick={this.props.closeModalHandler}></div>
				<div style={[styles.modalContent, this.props.mode && styles.modalContentActive]}>
					<p>Content goes here</p>
					<p>Content goes here</p>
					<p>Content goes here</p>
					<p>Content goes here</p>
					<p>Content goes here</p>
					<p>Content goes here</p>
					<p>Content goes here</p>
					<p>Content goes here</p>
					<p>Content goes here</p>
					<p>Content goes here</p>
					<p>Content goes here</p>
					<p>Content goes here</p>
					<p>Content goes here</p>
					<p>Content goes here</p>
					<p>Content goes here</p>
					<p>Content goes here</p>
					<p>Content goes here</p>
					<p>Content goes here</p>
					<p>Content goes here</p>
					<p>Content goes here</p>
					<p>Content goes here</p>
					<p>Content goes here</p>
					<p>Content goes here</p>
					<p>Content goes here</p>
					<p>Content goes here</p>
				</div>
			</div>
		);
	}
});

export default Radium(AtomEditorModals);

styles = {
	container: {
		position: 'fixed',
		top: 0,
		left: 0,
		width: '100vw',
		height: '100vh',
		backgroundColor: 'rgba(255,255,255,.75)',
		zIndex: 2,
		opacity: 0,
		pointerEvents: 'none',
		transition: '.1s linear opacity',
		
	},
	containerActive: {
		opacity: 1,
		pointerEvents: 'auto',
	},
	splash: {
		position: 'fixed',
		top: 0,
		left: 0,
		width: '100vw',
		height: '100vh',
		zIndex: 3,
	},
	modalContent: {
		position: 'fixed',
		zIndex: 4,
		padding: '1em',
		width: 'calc(70vw - 2em)',
		height: 'calc(70vh - 2em)',
		top: '15vh',
		left: '15vw',
		backgroundColor: 'white',
		overflow: 'hidden',
		overflowY: 'scroll',
		boxShadow: '0px 0px 5px #808284',
		transform: 'scale(0.8)',
		transition: '.1s ease-in-out transform',
	},
	modalContentActive: {
		transform: 'scale(1.0)',
	},
};