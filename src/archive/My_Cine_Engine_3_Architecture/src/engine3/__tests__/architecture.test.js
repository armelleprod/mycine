
import {auditPublishedBatch} from "../editorEngine";
import {DEFAULT_ENGINE_RULES} from "../constants";

const title = (id, rating = 8) => ({
  id,
  media_type:"movie",
  title:`Title ${id}`,
  rating,
  poster_path:"/poster.jpg",
  overview:"Overview"
});

export function runArchitectureSmokeTest() {
  const good = Array.from({length:7}, (_, index) => title(index + 1));
  const bad = [...good.slice(0, 6), title(6)];

  const goodAudit = auditPublishedBatch({
    titles:good,
    rules:DEFAULT_ENGINE_RULES,
    selectedLabels:[]
  });

  const badAudit = auditPublishedBatch({
    titles:bad,
    rules:DEFAULT_ENGINE_RULES,
    selectedLabels:[]
  });

  if (!goodAudit.passed) throw new Error("Expected valid batch to pass.");
  if (badAudit.passed) throw new Error("Expected duplicate batch to fail.");

  return true;
}
