import { connect } from 'react-redux';
import PositivePage from './positive_page';
import { fetchRandom } from '../../actions/affirmation_actions';
import { fetchUser } from '../../actions/user_actions';

const mapStateToProps = ({ user, affirmation }) => {
  return {
    user,
    affirmation
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: (user) => dispatch(fetchUser(user)),
    fetchRandom: () => dispatch(fetchRandom())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PositivePage);
