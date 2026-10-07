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

function FoodDetails({
  open,
  food,
  onClose,
}) {
  if (!food) {
    return null;
  }

  const nutrients = Array.isArray(food.nutrients)
    ? food.nutrients
    : [];

  const serving = food.serving;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle sx={{ pr: 6 }}>
        Informações do alimento

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

            <Typography color="text.secondary">
              {food.brand}
            </Typography>
          </Box>

          {food.description && (
            <>
              <Divider />

              <Box>
                <Typography
                  variant="subtitle1"
                  fontWeight={700}
                  gutterBottom
                >
                  Descrição
                </Typography>

                <Typography
                  color="text.secondary"
                  sx={{ lineHeight: 1.7 }}
                >
                  {food.description}
                </Typography>
              </Box>
            </>
          )}

          <Divider />

          <Box>
            <Typography
              variant="subtitle1"
              fontWeight={700}
              gutterBottom
            >
              Porção padrão
            </Typography>

            {serving ? (
              <Stack spacing={0.5}>
                <Typography>
                  Quantidade:{" "}
                  {serving.quantity ?? "—"}{" "}
                  {serving.unit ?? ""}
                </Typography>

                {serving.grams && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Equivalente: {serving.grams} g
                  </Typography>
                )}

                {serving.milliliters && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Equivalente:{" "}
                    {serving.milliliters} ml
                  </Typography>
                )}
              </Stack>
            ) : (
              <Typography color="text.secondary">
                Porção não informada.
              </Typography>
            )}
          </Box>

          <Divider />

          <Box>
            <Typography
              variant="subtitle1"
              fontWeight={700}
              gutterBottom
            >
              Informações nutricionais
            </Typography>

            {nutrients.length === 0 ? (
              <Typography color="text.secondary">
                Nenhuma informação nutricional disponível.
              </Typography>
            ) : (
              nutrients.map((nutrient) => (
                <Box
                  key={nutrient.id}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 2,
                    py: 1.25,
                    borderBottom:
                      "1px solid #eeeeee",
                  }}
                >
                  <Typography color="text.secondary">
                    {nutrient.name}
                  </Typography>

                  <Typography fontWeight={600}>
                    {nutrient.value ?? "—"}
                    {nutrient.unit
                      ? ` ${nutrient.unit}`
                      : ""}
                  </Typography>
                </Box>
              ))
            )}
          </Box>

          <Divider />

          <Box>
            {food.barcode && (
              <Typography
                variant="body2"
                color="text.secondary"
              >
                Código de barras: {food.barcode}
              </Typography>
            )}

            {food.basisUnit && (
              <Typography
                variant="body2"
                color="text.secondary"
              >
                Unidade base: {food.basisUnit}
              </Typography>
            )}
          </Box>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

export default FoodDetails;