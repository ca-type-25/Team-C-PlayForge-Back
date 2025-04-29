const permissions = {
    USER: ['read', 'create'],
    MODERATOR: ['read', 'create', 'edit', 'delete_own_content'],
    ADMIN: ['read', 'create', 'edit', 'delete_any_content', 'manage_users']
  };
  module.exports = permissions;
  