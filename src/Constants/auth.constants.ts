export const jwtConstants = {
  secret:
    process.env.SECRET_KEY ||
    "DO NOT USE THIS VALUE. INSTEAD, CREATE A COMPLEX SECRET AND KEEP IT SAFE OUTSIDE OF THE SOURCE CODE",
};
