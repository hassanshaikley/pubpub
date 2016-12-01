import Immutable from 'immutable';
import { ensureImmutable } from './index';

/* ---------- */
// Load Actions
/* ---------- */
import {
	GET_JOURNAL_DATA_LOAD,
	GET_JOURNAL_DATA_SUCCESS,
	GET_JOURNAL_DATA_FAIL,

	PUT_JOURNAL_DATA_LOAD,
	PUT_JOURNAL_DATA_SUCCESS,
	PUT_JOURNAL_DATA_FAIL,
} from 'containers/Journal/actions';

/* ------------------- */
// Define Default State
/* ------------------- */
const defaultState = Immutable.Map({
	loading: false,
	error: undefined,
	journal: {},
	layoutLoading: false,
	layoutError: undefined,
});

/* ----------------------------------------- */
// Bind actions to specific reducing functions
/* ----------------------------------------- */
export default function reducer(state = defaultState, action) {
	switch (action.type) {
	
	case GET_JOURNAL_DATA_LOAD:
		return state.merge({
			loading: true,
			error: false,
		});	
	case GET_JOURNAL_DATA_SUCCESS:
		return state.merge({
			loading: false,
			error: undefined,
			journal: action.result
		});
	case GET_JOURNAL_DATA_FAIL:
		return state.merge({
			loading: false,
			error: action.error,
			journal: null,
		});

	case PUT_JOURNAL_DATA_LOAD:
		return state.merge({
			layoutLoading: true,
			layoutError: undefined,
		});	
	case PUT_JOURNAL_DATA_SUCCESS:
		return state.merge({
			layoutLoading: false,
			layoutError: undefined,
		})
		.mergeIn(
			['journal'],
			action.newJournalData
		);
	case PUT_JOURNAL_DATA_FAIL:
		return state.merge({
			layoutLoading: false,
			layoutError: action.error,
			// journal: null,
		});

	default:
		return ensureImmutable(state);
	}
}
