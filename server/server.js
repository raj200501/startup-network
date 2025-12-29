const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const createApp = require('./app');

dotenv.config({ path: path.resolve(__dirname, '.env') });
dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

const startServer = async () => {
  await connectDB();
  const app = createApp();
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
};

startServer();
