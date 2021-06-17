import React, { useState } from "react";
import { Segment, Image, Grid, Divider, Header, Button, List } from "semantic-ui-react";
import { followUser, unfollowUser } from "../../utils/profileActions";

function ProfileHeader({
    profile,
    ownAccount,
    loggedUserFollowStats,
    setUserFollowStats
}) {
    const [loading, setLoading] = useState(false);

    const isFollowing =
        loggedUserFollowStats.following.length > 0 &&
        loggedUserFollowStats.following.filter(
            following => following.user === profile.user._id
    ).length > 0;

    return (
        <>
            <Segment>
                <Grid stackable>
                    <Grid.Column width={11}>
                        <Grid.Row>
                            <Header
                                as="h2"
                                content={profile.user.name}
                                style={{ marginBottom: "5px" }}
                            />
                        </Grid.Row>
                        <Grid.Row stretched>
                            {profile.bio}
                            <Divider hidden />
                        </Grid.Row>
                    </Grid.Column>

                    <Grid.Column width={5} stretched style={{ textAlign: "center" }}>
                        <Grid.Row>
                            <Image size="large" avatar src={profile.user.profilePicUrl} />
                        </Grid.Row>
                        <br />

                        {!ownAccount && (
                            <Button
                                compact
                                loading={loading}
                                disabled={loading}
                                content={isFollowing ? "Following" : "Follow"}
                                icon={isFollowing ? "check circle" : "add user"}
                                color={isFollowing ? "instagram" : "twitter"}
                                onClick={async () => {
                                    setLoading(true);
                                    isFollowing
                                        ? await unfollowUser(profile.user._id, setUserFollowStats)
                                        : await followUser(profile.user._id, setUserFollowStats);
                                setLoading(false);
                                }}
                            />
                        )}
                    </Grid.Column>
                </Grid>
            </Segment>
        </>
    );
}

export default ProfileHeader;
