'use strict';

(() => {
  const documentLoadHandler = () => {
    const postForm = document.querySelector('[data-role="post-form"]')
    const postModalElement = document.querySelector('[data-role="post-modal"]')
    const commentsWrapper = document.querySelector('[data-role="comments"]')

    try {
      const services = configureServices({
        BASE_URL: 'https://jsonplaceholder.typicode.com',
      });

      const findForm = new FindForm(postForm, services.getPostById, new services.EventBus());
      const postModal = new PostModal(postModalElement, new services.EventBus(), services.getCommentsByPostId);
      const commentsList = new Comments(commentsWrapper);

      findForm.eventBus.subscribe(FindForm.EVENT_POST_LOADED, (post) => {
        postModal.setPost(post);
        postModal.show();
      });

      postModal.eventBus.subscribe(PostModal.EVENT_COMMENTS_LOADED, ({comments}) => {
        commentsList.setItems(comments);
      });

      postModal.eventBus.subscribe(PostModal.EVENT_CLOSED, () => {
        commentsList.reset();
      });


    } catch (e) {
      console.error(e);
    }
  };

  document.addEventListener('DOMContentLoaded', documentLoadHandler);
})();