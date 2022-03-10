import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import classes from "./ShackCard.module.css";
import Link from "next/link";

const ShackCard = ({ shack, width }) => {
  const shackLink = `/shacks/${shack.id}`;

  return (
    <Link href={shackLink}>
      <Card className={classes.card} sx={{ width: { width } }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="160"
            image={shack.imageUrl}
            alt={shack.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {shack.title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              className={classes.cardText}
            >
              {shack.description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
};

export default ShackCard;
