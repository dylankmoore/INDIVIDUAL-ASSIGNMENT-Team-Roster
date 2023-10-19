/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import MemberCard from '../components/MemberCard';
import { getMembers } from '../api/memberData';

// FUNCTION TO SHOW ALL MEMBERS
export default function Team() {
  const [members, setMembers] = useState([]);
  const { user } = useAuth();

  const getAllMembers = () => {
    getMembers(user.uid).then(setMembers);
  };

  useEffect(() => {
    getAllMembers();
  }, []);

  return (
    <div
      id="team-main"
      className="text-center"
      style={{
        padding: '30px',
        paddingTop: '30px',
        alignItems: 'center',
      }}
    >
      <div>
        <div className="member-button">
          <Link href="/member/new" passHref>
            <Button className="add-member" id="addmem">Add Member</Button>
          </Link><br /><br />
        </div>
        <div className="teams">
          {members.map((member) => (
            <MemberCard key={member.firebaseKey} memberObj={member} onUpdate={getAllMembers} />
          ))}
        </div>
      </div>
    </div>
  );
}
