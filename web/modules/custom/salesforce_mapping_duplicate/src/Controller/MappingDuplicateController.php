<?php

namespace Drupal\salesforce_mapping_duplicate\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\salesforce_mapping\Entity\SalesforceMapping;
use Symfony\Component\HttpFoundation\RedirectResponse;

class MappingDuplicateController extends ControllerBase {

  public function duplicate(SalesforceMapping $salesforce_mapping) {
    // Create the duplicate.
    $copy = $salesforce_mapping->createDuplicate();

    // Generate a unique ID for the new config entity.
    $base_id = $salesforce_mapping->id() . '_copy';
    $new_id = $base_id;
    $i = 1;
    while (SalesforceMapping::load($new_id)) {
      $new_id = $base_id . '_' . $i++;
    }

    // Set the label and ID.
    $copy->set('id', $new_id);
    $copy->set('label', $salesforce_mapping->label() . ' (Copy)');

    // Save it.
    $copy->save();

    $this->messenger()->addMessage($this->t('Salesforce mapping "@label" duplicated.', ['@label' => $salesforce_mapping->label()]));

    return new RedirectResponse('/admin/structure/salesforce/mappings');
  }
}
