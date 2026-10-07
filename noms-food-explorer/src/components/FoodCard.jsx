import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Typography,
} from "@mui/material";

function FoodCard({ food, onSelect }) {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
      }}
    >
      {food.imageUrl && (
        <CardMedia
          component="img"
          height="180"
          image={food.imageUrl}
          alt={food.name}
          sx={{
            objectFit: "cover",
          }}
        />
      )}

      <CardContent
        sx={{
          flexGrow: 1,
        }}
      >
        <Typography
          variant="h6"
          component="h2"
          fontWeight={700}
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            mb: 1,
          }}
        >
          {food.name}
        </Typography>

        {food.brandName && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 2,
            }}
          >
            {food.brandName}
          </Typography>
        )}

        <Stack
          direction="row"
          spacing={1}
          useFlexGap
          flexWrap="wrap"
        >
          <Chip
            label={`${food.calories ?? "—"} kcal`}
            size="small"
          />

          <Chip
            label={`${food.protein ?? "—"} g proteína`}
            size="small"
          />

          <Chip
            label={`${food.carbohydrates ?? "—"} g carboidratos`}
            size="small"
          />
        </Stack>
      </CardContent>

      <CardActions
        sx={{
          p: 2,
          pt: 0,
        }}
      >
        <Button
          fullWidth
          variant="outlined"
          onClick={() => onSelect(food)}
        >
          Ver detalhes
        </Button>
      </CardActions>
    </Card>
  );
}

export default FoodCard;