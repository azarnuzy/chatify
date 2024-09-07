const LoginPage = () => {
  return (
    <div>
      <a href="https://slack.com/oauth/v2/authorize?client_id=7690010220725.7692792019875&scope=channels:history,chat:write,chat:write.customize,chat:write.public,conversations.connect:read,emoji:read,im:history,im:read,im:write,links:read,reactions:read,channels:read&user_scope=">
        <img
          alt="Add to Slack"
          height="40"
          width="139"
          src="https://platform.slack-edge.com/img/add_to_slack.png"
          srcSet="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x"
        />
      </a>
    </div>
  );
};

export default LoginPage;
