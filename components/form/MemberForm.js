import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { getMembers, updateMember, createMember } from '../../api/memberData';

const initialState = {
  name: '',
  image: '',
  role: '',
};

// function to render add/edit member form
function MemberForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [setMembers] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getMembers(user.uid).then(setMembers);

    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // function to re render the team view upon submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateMember(formInput).then(() => router.push('/team'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createMember(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateMember(patchPayload).then(() => {
          router.push('/team');
        });
      });
    }
  };

  // add/edit member form
  return (
    <div id="form">
      <Form onSubmit={handleSubmit}>
        <h1 className="text-black mt-5">{obj.firebaseKey ? 'Update' : 'Add A'} Member:</h1><hr />
        {/* Name INPUT  */}
        <FloatingLabel controlId="floatingInput1" label="Name" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Enter Member's Name"
            name="name"
            value={formInput.name}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        {/* IMAGE INPUT  */}
        <FloatingLabel controlId="floatingInput2" label="Member Image" className="mb-3">
          <Form.Control
            type="url"
            placeholder="Enter an image url"
            name="image"
            value={formInput.image}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        {/* ROLE INPUT  */}
        <FloatingLabel controlId="floatingInput3" label="Role" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Enter Role"
            name="role"
            value={formInput.role}
            onChange={handleChange}
            required
          />
        </FloatingLabel>
        <Button id="member-form" type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Member</Button>
      </Form>
    </div>
  );
}

MemberForm.propTypes = {
  obj: PropTypes.shape({
    role: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

MemberForm.defaultProps = {
  obj: initialState,
};

export default MemberForm;
