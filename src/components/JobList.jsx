import InfoJobCard from "./InfoJobCard";
import CreateModalJobDetail from "./CreateModalJobDetail";
import React from "react";

const JobList = (prop) => {
  const [currentPost, setCurrentPost] = React.useState({});
  const [isOpen, setIsOpen] = React.useState(false);

  function viewMore(post) {
    setIsOpen(true);
    setCurrentPost(() => post);
  }

  return (
    <>
      <div className="font-poppins rounded-lg grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6">
        {prop.posts.map((post) => (
          <InfoJobCard
            key={post._id}
            post={post}
            viewMore={() => viewMore(post)}
            isRecruiter={prop.isRecruiter}
          />
        ))}
      </div>
      <CreateModalJobDetail
        isOpen={isOpen}
        post={currentPost}
        onClose={() => setIsOpen(false)}
        showParticipantList={prop.showParticipantList}
        postulateBtn={prop.postulateBtn}
        isRecruiter={prop.isRecruiter}
        posts={prop.post}
      />
    </>
  );
};

export default JobList;
