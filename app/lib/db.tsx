import mysql from "mysql2/promise"

// Path: app/api/test.tsx
const executeQuery = async (query: string, data: any) => {
    try {
        const pool = await mysql.createPool({
          host: "aws.connect.psdb.cloud",
          port: 3306,
          database: "example",
          user: "zn7p5by1jran0dx4lxxh",
          password: "pscale_pw_PYjkjx4fhoAcqJnZlwYgD9gZc0kdyfVgoeBrsJtI1Ex",
          waitForConnections: true,
          connectionLimit: 10,
          queueLimit: 0,
          ssl: {
            // Add your SSL options here, e.g., ca, cert, key
            // Example:
            // ca: fs.readFileSync('path/to/ca.pem'),
            // cert: fs.readFileSync('path/to/cert.pem'),
            // key: fs.readFileSync('path/to/key.pem'),
          },
        });
  
      const [result] = await pool.execute(query, data);
  
      pool.end(); // Release the connection back to the pool
  
      console.log(result);
  
      return result;
    } catch (error) {
      console.error(error);
      throw error; // Re-throw the error to handle it at a higher level
    }
  };

export default executeQuery;
  