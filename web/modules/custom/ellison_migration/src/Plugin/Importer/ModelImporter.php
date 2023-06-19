<?php

namespace Drupal\ellison_migration\Plugin\Importer;

use Drupal\csv_importer\Plugin\ImporterBase;

/**
 * Class ModelImporter.
 *
 * @Importer(
 *   id = "model_importer",
 *   entity_type = "model",
 *   label = @Translation("Model importer")
 * )
 */
class ModelImporter extends ImporterBase {}