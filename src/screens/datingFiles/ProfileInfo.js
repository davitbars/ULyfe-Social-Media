import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase';
import "./ProfileInfo.css";

const ProfileInfo = ({ currentProfileUid }) => {
    const [datingProfile, setDatingProfile] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchDatingProfile = async () => {
            try {
                const datingProfilesQuery = query(collection(db, 'datingProfiles'), where('uid', '==', currentProfileUid));
                const datingProfilesSnapshot = await getDocs(datingProfilesQuery);

                if (!datingProfilesSnapshot.empty) {
                    const datingProfileData = datingProfilesSnapshot.docs[0].data();
                    setDatingProfile(datingProfileData);
                }
            } catch (error) {
                console.error('Error fetching dating profile:', error);
            }
        };

        const fetchUser = async () => {
            try {
                const usersQuery = query(collection(db, 'users'), where('uid', '==', currentProfileUid));
                const usersSnapshot = await getDocs(usersQuery);

                if (!usersSnapshot.empty) {
                    const userData = usersSnapshot.docs[0].data();
                    setUser(userData);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        if (currentProfileUid) {
            fetchDatingProfile();
            fetchUser();
        }
    }, [currentProfileUid]);

    if (!datingProfile || !user) {
        return <div></div>; // You can add a loading indicator
    }

    return (
        <div className="profile-info-box">
            <h2>
                {user.name}
            </h2>
            <p>
                <span className="info-label">Age: </span>
                {datingProfile.age}
            </p>
            <p>
                <span className="info-label">Gender: </span>
                {datingProfile.gender}
            </p>
            <p>
                <span className="info-label">Race: </span>
                {datingProfile.race}
            </p>
            <p>
                <span className="info-label">Major: </span>
                {user.major}
            </p>
            <p>
                <span className="info-label">Graduation Year: </span>
                {user.graduationYear}
            </p>
            <p>
                <span className="info-label">Hobbies: </span>
                {datingProfile.hobbies}
            </p>
            <p>
                <span className="info-label">Bio: </span>
                {datingProfile.bio}
            </p>
        </div>

    );
};

export default ProfileInfo;
