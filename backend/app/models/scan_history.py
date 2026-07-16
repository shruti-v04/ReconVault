from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import declarative_base
from datetime import datetime

Base = declarative_base()


class ScanHistory(Base):
    __tablename__ = "scan_history"

    id = Column(Integer, primary_key=True, index=True)

    domain = Column(String, nullable=False)

    risk_score = Column(Integer)

    status = Column(String)

    scanned_at = Column(DateTime, default=datetime.utcnow)