import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

function NutrientItem({ label, value, unit = "" }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 2,
        py: 1.5,
      }}
    >
      <Typography color="text.secondary">
        {label}
      </Typography>

      <Typography fontWeight={600}>
        {value ?? "—"} {unit}
      </Typography>
    </Box>
  );
}

function FoodDetails({ open, food, onClose }) {
  if (!food) {
    return null;
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle
        sx={{
          pr: 6,
        }}
      >
        Informações nutricionais

        <IconButton
          aria-label="Fechar"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
        >
          ×
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Stack spacing={2}>
          <Box>
            <Typography
              variant="h5"
              fontWeight={700}
              gutterBottom
            >
              {food.name}
            </Typography>

            {food.brandName && (
              <Typography color="text.secondary">
                {food.brandName}
              </Typography>
            )}
          </Box>

          <Divider />

          <Box>
            <NutrientItem
              label="Calorias"
              value={food.calories}
              unit="kcal"
            />

            <NutrientItem
              label="Proteínas"
              value={food.protein}
              unit="g"
            />

            <NutrientItem
              label="Carboidratos"
              value={food.carbohydrates}
              unit="g"
            />

            <NutrientItem
              label="Gorduras"
              value={food.fat}
              unit="g"
            />

            <NutrientItem
              label="Fibras"
              value={food.fiber}
              unit="g"
            />
          </Box>

          <Divider />

          <Typography
            variant="caption"
            color="text.secondary"
          >
            Valores nutricionais conforme os dados
            disponibilizados pela aplicação.
          </Typography>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

export default FoodDetails;