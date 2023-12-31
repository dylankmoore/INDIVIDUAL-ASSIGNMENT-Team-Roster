import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import { deleteSingleMember } from '../api/memberData';

// FUNCTION TO DELETE A MEMBER
export default function MemberCard({ memberObj, onUpdate }) {
  const deleteThisMember = () => {
    if (window.confirm(`Remove ${memberObj.name}?`)) {
      deleteSingleMember(memberObj.firebaseKey).then(() => onUpdate());
    }
  };

  // MEMBER CARDS
  return (
    <div id="membercards">
      <Card style={{ width: '18rem', margin: '10px' }}>
        <Card.Img variant="top" src={memberObj.image} alt={memberObj.name} height="300px" />
        <Card.Body>
          <Card.Title>{memberObj.name}</Card.Title>
          <p className="card-text bold">{memberObj.role}</p>
          <div className="text-center">
            {/* DYNAMIC LINK TO EDIT THE MEMBER DETAILS  */}
            <Link href={`/member/edit/${memberObj.firebaseKey}`} passHref>
              <Button id="edit">EDIT</Button>
            </Link>
            <Button id="memdel" className="m-2" onClick={deleteThisMember}>
              DELETE
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

MemberCard.propTypes = {
  memberObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    role: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
