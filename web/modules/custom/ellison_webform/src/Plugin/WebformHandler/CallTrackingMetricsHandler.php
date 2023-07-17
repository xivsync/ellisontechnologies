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
 *   id = "call_tracking_metrics_handler",
 *   label = @Translation("Push form data to Call Tracking Metrics"),
 *   category = @Translation("Action"),
 *   description = @Translation("Pushes form data to Call Tracking Metrics."),
 *   cardinality = \Drupal\webform\Plugin\WebformHandlerInterface::CARDINALITY_UNLIMITED,
 *   results = \Drupal\webform\Plugin\WebformHandlerInterface::RESULTS_PROCESSED,
 *   submission = \Drupal\webform\Plugin\WebformHandlerInterface::SUBMISSION_REQUIRED,
 * )
 */
 
class CallTrackingMetricsHandler extends WebformHandlerBase {
 
  public function confirmForm(array &$form, FormStateInterface $form_state, WebformSubmissionInterface $webform_submission) {

    $curl = curl_init();

    $values = $webform_submission->getData();

    $caller_name = urlencode($values['firstname'] . ' ' . $values['lastname']);
    $firstname = urlencode($values['firstname']);
    $lastname = urlencode($values['lastname']);
    $phone = urlencode($values['phone']);
    $email = urlencode($values['email']);
    $title = urlencode($values['title']);
    $company = urlencode($values['company']);
    $street = urlencode($values['street']);
    //$city = urlencode($values['city']);
    $city = urlencode('Stillwater');
    $state = urlencode($values['state']);
    $postalcode = urlencode($values['postalcode']);
    $leads_interest__c = urlencode($values['leads_interest__c']);
    $how_did_you_hear__c = urlencode($values['how_did_you_hear__c']);
    $webform_best_time__c = urlencode($values['webform_best_time__c']);
    $industry = urlencode($values['industry']);
    $select_location = urlencode($values['select_location']);
    $description = urlencode($values['description']);
    $opt_in = urlencode($values['opt_in']);
    $region__c = urlencode($values['region__c']);
    $leadsource_not_used = urlencode($values['leadsource_not_used']);
    $webform_email_sign_up__c = urlencode($values['webform_email_sign_up__c']);
    $builder_interest__c = urlencode($values['builder_interest__c']);
    $webform_name__c = urlencode($values['webform_name__c']);
    $webform_campaign_id__c = urlencode($values['webform_campaign_id__c']);
    $opt_in = urlencode($values['opt_in']);

    $post_fields = "
      caller_name={$caller_name}
      &country_code=1
      &phone_number={$phone}
      &email={$email}
      &visitor_sid=unique-ctm-visitor-id
      &callback_number=%2B13332224444
      &receiving_number=%2B18009940146
      &custom_edit-submitted-firstname={$firstname}
      &custom_edit-submitted-lastname={$lastname}
      &custom_edit-submitted-email={$email}
      &custom_edit-submitted-title={$title}
      &custom_edit-submitted-company={$company}
      &custom_edit-submitted-street={$street}
      &custom_edit-submitted-city={$city}
      &custom_edit-submitted-state={$state}
      &custom_edit-submitted-postalcode={$postalcode}
      &custom_edit-submitted-leads-interest-c={$leads_interest__c}
      &custom_edit-submitted-how-did-you-hear-c={$how_did_you_hear__c}
      &custom_edit-submitted-webform-best-time-c={$webform_best_time__c}
      &custom_edit-submitted-industry={$industry}
      &custom_select_location={$select_location}
      &custom_edit-submitted-description={$description}
      &custom_edit-submitted-opt_in={$opt_in}
      &custom_edit-submitted-region__c={$region__c}
      &custom_edit-submitted-webform_email_sign_up__c={$webform_email_sign_up__c}
      &custom_edit-submitted-builder-interest-c={$builder_interest__c}
      &custom_edit-submitted-webform-name-c={$webform_name__c}
      &custom_edit-submitted-submitted-webform_campaign_id__c={$webform_campaign_id__c}
      &custom_edit-submitted-submitted-opt_in={$opt_in}
    ";

    // remove line breaks from between fields
    $post_fields = preg_replace("/\r|\n/", "", $post_fields);

    curl_setopt_array($curl, array(
      CURLOPT_URL => 'https://api.calltrackingmetrics.com/api/v1/formreactor/FRT472ABB2C5B9B141ADAB06C7A709212DB922839F0589BD3C86E24F9356DEDDA29?key=6y0SQYZx6CgmOi9WOvjFX8FkMd7GEF3bWOi79GgXz8WZU_Qg',
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_ENCODING => '',
      CURLOPT_MAXREDIRS => 10,
      CURLOPT_TIMEOUT => 0,
      CURLOPT_FOLLOWLOCATION => true,
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
      CURLOPT_CUSTOMREQUEST => 'POST',
      CURLOPT_POSTFIELDS => $post_fields,
      CURLOPT_HTTPHEADER => array(
        'Content-Type: application/x-www-form-urlencoded'
      ),
    ));
    
    $response = curl_exec($curl);
    
    curl_close($curl);

    \Drupal::logger('ellison_webform')->info('The response from webform submission: ' . print_r(serialize($response), TRUE));

  }

}