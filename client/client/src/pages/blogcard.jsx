import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import axios from 'axios';

const BlogCard = () => {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/blogs/");
      setBlogs(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <>
      <Grid container spacing={2}>
        {blogs.map((blog) => {
          return (
            <Grid item xs={12} sm={6} md={4} key={blog.id}>
              <Link to={`/blog/${blog._id}`} style={{ textDecoration: 'none' }}>
                <Card sx={{ maxWidth: 345, cursor: 'pointer' }}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {blog.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {blog.excerpt}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Learn More</Button>
                  </CardActions>
                </Card>
              </Link>
              <br />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default BlogCard;
