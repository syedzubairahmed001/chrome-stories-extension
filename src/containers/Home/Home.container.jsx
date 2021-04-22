import React, { useContext } from "react";

import axios from "../../services/axios";
import Header from "../../components/Header/Header.component";
import sytles from "./Home.module.css";
import StoryIcon from "../../components/StoryIcon/StoryIcon.component";
import { GlobalContext } from "../../context/globalContext";
import { UserContext } from "../../context/userContext";
import { getAccessToken } from "../../helpers/auth";
import GreetingHeader from "./GreetingsHeader/GreetingsHeader.component";

const Home = (props) => {
  const { globalContext, setGlobalContext } = React.useContext(GlobalContext);
  const { userContext, setUserContext } = React.useContext(UserContext);
  const [message, setMessage] = React.useState(null);

  React.useEffect(() => {
    let localUser = JSON.parse(localStorage.getItem("user"));
    if (localUser && !userContext.user.name) {
      setUserContext((prev) => ({
        ...prev,
        user: {
          ...prev.user,
          name: localUser.name,
          email: localUser.email,
          profilePicture: localUser.profilePicture,
          story: localUser.story,
          themeId: localUser.themeId || "0",
          bio: localUser.bio || "",
          twitterHandle: localUser.twitterHandle || "",
          instagramHandle: localUser.instagramHandle || "",
        },
      }));
    }
    if (globalContext.stories.length === 0) {
      getStories();
    } else {
      if (localUser && localUser.email) {
        const storiesToSave = globalContext.stories.filter((e) => {
          return e._fieldsProto.email.stringValue !== localUser.email;
        });
        setGlobalContext((prev) => ({ ...prev, stories: storiesToSave }));
      }
    }
  }, []);
  const getStories = async () => {
    setGlobalContext((prev) => ({ ...prev, loading: true }));
    const accessToken = await getAccessToken();
    axios
      .post("/getStories", {
        offsetEmail:
          (globalContext.stories &&
            globalContext.stories.length > 0 &&
            globalContext.stories[globalContext.stories.length - 1]._fieldsProto
              .email.stringValue) ||
          "",
      })
      .then((res) => {
        const storyData = res.data.data;
        const limit = storyData.length;
        const offset = globalContext.currentStoriesOffset + limit;
        if (!res.data.data) {
          if (res.data.error) {
            setMessage(res.data.error.msg);
          } else {
            setMessage("something went wrong");
          }
          setGlobalContext((prev) => ({
            ...prev,
            loading: false,
          }));
        } else {
          let localUser = JSON.parse(localStorage.getItem("user"));
          const storiesToSave = res.data.data.filter((e) => {
            return (
              e._fieldsProto.email.stringValue !==
              (localUser && localUser.email)
            );
          });
          if (globalContext.stories.length > 0) {
            setGlobalContext((prev) => ({
              ...prev,
              loading: false,
              stories: [...prev.stories, ...storiesToSave],
              currentStoriesLimit: limit,
              currentStoriesOffset: offset,
            }));
          } else {
            setGlobalContext((prev) => ({
              ...prev,
              loading: false,
              stories: storiesToSave,
              currentStoriesLimit: limit,
              currentStoriesOffset: offset,
            }));
          }
        }
      })
      .catch((err) => {
        setGlobalContext((prev) => ({ ...prev, loading: false }));
        console.log(err);
      });
  };
  const renderStories = () => {
    const stories = globalContext.stories || [];
    let delay = 1;
    const storiesCards = stories.map((e, i) => {
      const story = e._fieldsProto;
      if (i % 5 === 0) {
        delay++;
      }
      console.log({ delay }, i % 3 === 0);
      return (
        <StoryIcon
          className={`animate--slide-up a-delay-${delay}`}
          key={i}
          title={story.name.stringValue}
          photoUrl={story.photoUrl.stringValue}
          index={i}
        />
      );
    });
    return storiesCards;
  };
  return (
    <div>
      <div className={sytles.container}>
        {/* <GreetingHeader /> */}
        {userContext.user.email && (
          <StoryIcon
            title="Your Story"
            yourStory={true}
            photoUrl={userContext.user.profilePicture}
          />
        )}
        {globalContext.loading && globalContext.stories.length === 0 ? (
          <div></div>
        ) : (
          renderStories()
        )}
        {globalContext.currentStoriesLimit >= 30 && (
          <div className="text-center">
            <button className="btn-tertiary" onClick={getStories}>
              Load more
            </button>
          </div>
        )}
        {message && (
          <p className="text-secondary font-small text-center">{message}</p>
        )}
        {/*  */}
      </div>
    </div>
  );
};

export default Home;
