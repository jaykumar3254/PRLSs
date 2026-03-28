"""
PRLSS Database Models
=====================
Apartment       – 50 Nashik apartments with ML features
TimelineVisit   – User's Google Timeline visits (clustered)
UserPreference  – Saved search profiles
RecommendationFeedback – User ratings on recommendations
"""

from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator


class City(models.TextChoices):
    NASHIK = "nashik", "Nashik"
    MUMBAI = "mumbai", "Mumbai"
    PUNE = "pune", "Pune"


class Apartment(models.Model):
    """
    Represents a rentable apartment unit.
    Data imported from ml_apartments.csv via load_data management command.
    """

    # Identity
    name = models.CharField(max_length=200, db_index=True)
    city = models.CharField(max_length=20, choices=City.choices, default=City.NASHIK, db_index=True)

    # Location
    lat = models.FloatField(help_text="Latitude (WGS-84)")
    lon = models.FloatField(help_text="Longitude (WGS-84)")
    address = models.TextField(blank=True)

    # Financials
    rent = models.PositiveIntegerField(help_text="Monthly rent in INR")

    # ML Feature columns (normalised 0–1 unless noted)
    college_dist = models.FloatField(
        help_text="Distance to nearest college/workplace in km",
        validators=[MinValueValidator(0.0)],
    )
    grocery_dist = models.FloatField(
        help_text="Distance to nearest grocery store in km",
        validators=[MinValueValidator(0.0)],
    )
    amenity_score = models.FloatField(
        help_text="Amenity quality score 0–1",
        validators=[MinValueValidator(0.0), MaxValueValidator(1.0)],
    )
    value_score = models.FloatField(
        help_text="Overall value-for-money score 0–1 (ML target)",
        validators=[MinValueValidator(0.0), MaxValueValidator(1.0)],
    )

    # Extra metadata for admin display
    furnished = models.BooleanField(default=False)
    bhk = models.PositiveSmallIntegerField(default=1, help_text="Bedroom-Hall-Kitchen count")
    contact = models.CharField(max_length=15, blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["rent"]
        verbose_name = "Apartment"
        verbose_name_plural = "Apartments"
        indexes = [
            models.Index(fields=["city", "rent"]),
            models.Index(fields=["city", "value_score"]),
        ]

    def __str__(self) -> str:
        return f"{self.name} ({self.city.title()}) – ₹{self.rent:,}/mo"

    @property
    def match_percent(self) -> int:
        """Convert value_score to a human-readable percentage."""
        return round(self.value_score * 100)


class TimelineVisit(models.Model):
    """
    Stores one cleaned visit from the user's Google Timeline JSON.
    Imported from extracted_timeline.csv.
    """

    lat = models.FloatField()
    lon = models.FloatField()
    visit_freq = models.PositiveIntegerField(default=1, help_text="Number of visits to this location")
    cluster = models.PositiveSmallIntegerField(
        default=0,
        help_text="K-Means cluster id (0=college, 1=market, 2=home, 3=leisure, 4=transport)",
    )
    place_name = models.CharField(max_length=200, blank=True, help_text="Resolved via Google Places")
    created_at = models.DateTimeField(auto_now_add=True)

    CLUSTER_LABELS = {
        0: "College/Work",
        1: "Market",
        2: "Home",
        3: "Leisure",
        4: "Transport Hub",
    }

    class Meta:
        verbose_name = "Timeline Visit"
        verbose_name_plural = "Timeline Visits"
        ordering = ["-visit_freq"]

    def __str__(self) -> str:
        label = self.CLUSTER_LABELS.get(self.cluster, f"Cluster {self.cluster}")
        return f"{label} @ ({self.lat:.4f}, {self.lon:.4f}) – freq={self.visit_freq}"


class UserPreference(models.Model):
    """
    Stores a user's relocation search profile.
    Used for analytics and re-running recommendations.
    """

    name = models.CharField(max_length=100)
    mobile = models.CharField(max_length=15, blank=True)
    city = models.CharField(max_length=20, choices=City.choices, default=City.NASHIK)

    # Job/college location
    college_lat = models.FloatField(help_text="Target workplace latitude")
    college_lon = models.FloatField(help_text="Target workplace longitude")

    # Budget
    rent_budget = models.PositiveIntegerField(help_text="Max monthly rent in INR")

    # Result snapshot (JSON)
    result_snapshot = models.JSONField(null=True, blank=True, help_text="Top-5 results at time of search")

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "User Preference"
        verbose_name_plural = "User Preferences"
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return f"{self.name} | {self.city.title()} | ₹{self.rent_budget:,}"


class RecommendationFeedback(models.Model):
    """
    User rates a recommended apartment (1–5 stars).
    Used to fine-tune ML model over time.
    """

    class Rating(models.IntegerChoices):
        ONE = 1, "⭐ Poor"
        TWO = 2, "⭐⭐ Fair"
        THREE = 3, "⭐⭐⭐ Good"
        FOUR = 4, "⭐⭐⭐⭐ Great"
        FIVE = 5, "⭐⭐⭐⭐⭐ Excellent"

    user_pref = models.ForeignKey(
        UserPreference,
        on_delete=models.CASCADE,
        related_name="feedbacks",
    )
    apartment = models.ForeignKey(
        Apartment,
        on_delete=models.CASCADE,
        related_name="feedbacks",
    )
    rating = models.PositiveSmallIntegerField(choices=Rating.choices)
    comment = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Recommendation Feedback"
        verbose_name_plural = "Recommendation Feedbacks"
        unique_together = [("user_pref", "apartment")]
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return f"{self.user_pref.name} → {self.apartment.name}: {self.rating}★"