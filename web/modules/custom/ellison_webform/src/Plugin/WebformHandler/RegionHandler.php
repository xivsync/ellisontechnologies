<?php
namespace Drupal\ellison_webform\Plugin\WebformHandler;
 
use Drupal\Core\Annotation\Translation;
use Drupal\Core\Config\ConfigFactoryInterface;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Logger\LoggerChannelFactoryInterface;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\webform\Annotation\WebformHandler;
use Drupal\webform\Plugin\WebformHandler\EmailWebformHandler;
use Drupal\webform\Plugin\WebformHandlerBase;
use Drupal\webform\Plugin\WebformHandlerInterface;
use Drupal\webform\Plugin\WebformHandlerMessageInterface;
use Drupal\webform\WebformSubmissionConditionsValidatorInterface;
use Drupal\webform\WebformSubmissionInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Set region on session
 *
 * @WebformHandler(
 *   id = "region_handler",
 *   label = @Translation("Set Region for Session"),
 *   category = @Translation("Action"),
 *   description = @Translation("Adds the users selected region value to the session."),
 *   cardinality = \Drupal\webform\Plugin\WebformHandlerInterface::CARDINALITY_UNLIMITED,
 *   results = \Drupal\webform\Plugin\WebformHandlerInterface::RESULTS_PROCESSED,
 *   submission = \Drupal\webform\Plugin\WebformHandlerInterface::SUBMISSION_REQUIRED,
 * )
 */
 
class RegionHandler extends WebformHandlerBase {
 
  public function confirmForm(array &$form, FormStateInterface $form_state, WebformSubmissionInterface $webform_submission) {

    // In here, we perform our logic to manipulate and use the webform submission data however we want.
    // To access data from the webform submission, we call $webform_submission->getData(), we should be able to grab a part of the array that should be returned using a key.
    // The key will be the machine name of the field on the webform. 
    // So for example, if you have a field on the webform with a machine name of group, you code to get the value would be $webform_submission->getData()['group']
    
    $values = $webform_submission->getData();

    if (!empty($values['region'])) {
      // get term id
      $region_id = $values['region'];
      // get term name
      $region = \Drupal\taxonomy\Entity\Term::load($region_id)->get('name')->value;
      // get sssion
      $session = \Drupal::request()->getSession();
      // add region value to session
      $session->set('region', $region);
      $session->set('region_id', $region_id);
      // get region value from session and send to logger
      $session_region = $session->get('region');
      \Drupal::logger('ellison_webform')->info('The region "' . $session_region . ' (#' . $region_id . ')" added to session successfully.');
    
    }



  
  }

}