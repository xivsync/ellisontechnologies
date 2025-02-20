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
      // set Salesforce region id
      switch ($region_id) {
        case '106':
          // Minnesota
          $sf_region_id = '308';
          break;
        case '107':
          // Northwest
          $sf_region_id = '210';
          break;
        case '108':
          // Wisconsin
          $sf_region_id = '307';
          break;
        case '110':
          // 'TriStates - Iowa/NE'
          $sf_region_id = '320';
          break;
        case '116':
          // Ohio
          $sf_region_id = '355';
          break;
        case '109':
          // Northern - California
          $sf_region_id = '219';
          break;
        case '111':
          // 'Southern - California'
          $sf_region_id = '218';
          break;
        case '115':
          // 'Southeast - Nashville'
          $sf_region_id = '450';
          break;
        case '112':
          // 'Illinois'
          $sf_region_id = '304';
          break;
        case '114':
          // Indiana
          $sf_region_id = '340';
          break;
        default:
          // 'Southern - California'
          $sf_region_id = '218';
      }
      // set region name from region terms
      $region = \Drupal\taxonomy\Entity\Term::load($region_id)->get('name')->value;
      // set cookie with region json object
      $region_values = [
        'region_id' => $region_id,
        'region' => $region,
        'sf_region_id' => $sf_region_id
      ];
      $cookie_value = json_encode($region_values, true);
      $host = $_SERVER['HTTP_HOST'];
      setcookie('ellison_region', $cookie_value, time() + 15768000, '/', $host); // Expires in 6 months
      \Drupal::logger('ellison_webform')->info('The region "' . $cookie_value. ' (Salesforce #' . $sf_region_id . ')" saved to ellison_region cookie successfully.');
    
    }



  
  }

}